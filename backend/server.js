const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const server = http.createServer(app);
const path = require("path");
const envFile = process.env.NODE_ENV === "development" ? ".env.local" : ".env";
require("dotenv").config({ path: path.resolve(__dirname, envFile) });
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

function authenticateJWT(req, res, next) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.slice(7);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Invalid token" });
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
}

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));

const io = new Server(server, { cors: corsOptions });
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/messaging";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Passport / Google OAuth setup
const User = require("./models/User");

const backendUrl = (process.env.BACKEND_URL || "http://localhost:4000").replace(
  /\/+$/,
  "",
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${backendUrl}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existing = await User.findOne({ googleId: profile.id });
        if (existing) {
          console.log("Existing user:", existing.email);
          return done(null, existing);
        }

        const user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        });

        console.log("New user created:", user.email);
        done(null, user);
      } catch (err) {
        console.error("Error in GoogleStrategy:", err);
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((u) => done(null, u))
    .catch(done);
});

app.use(passport.initialize());

// Routes
const messagesRoute = require("./routes/messages")(io);
app.use("/messages", authenticateJWT, messagesRoute);

// OAuth endpoints
// Start Google login
app.get("/auth/google", (req, res, next) => {
  const redirectUri =
    req.query.redirect_uri ||
    process.env.FRONTEND_URL ||
    "http://localhost:5173";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    state: redirectUri, // Pass frontend redirect in state
  })(req, res, next);
});

// Handle Google callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    session: false,
  }),
  (req, res) => {
    try {
      if (!req.user) throw new Error("User not found after authentication");

      const token = generateToken(req.user);

      const redirectUri =
        req.query.state || process.env.FRONTEND_URL || "http://localhost:5173";

      console.log("Redirecting to:", redirectUri);

      res.redirect(`${redirectUri}?token=${token}`);
    } catch (err) {
      console.error("Error in Google callback:", err);
      res.status(500).send("Internal Server Error");
    }
  },
);

app.get("/auth/failure", (req, res) => {
  res.status(401).send("Authentication failed");
});

// Socket authentication
io.use((socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;
  if (!token) return next(new Error("Authentication error"));
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error("Authentication error"));
    socket.user = decoded;
    next();
  });
});

io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id, "user:", socket.user?.name);
  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
