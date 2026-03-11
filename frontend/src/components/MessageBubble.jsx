import React from "react";

export default function MessageBubble({ message, isOwn }) {
  return (
    <div
      className={`flex items-end ${isOwn ? "justify-end" : "justify-start"}`}
    >
      {!isOwn && message.avatar && (
        <img
          src={message.avatar}
          alt="avatar"
          className="w-6 h-6 rounded-full mr-2"
        />
      )}
      <div className="flex flex-col">
        {!isOwn && (
          <span className="text-xs font-semibold text-gray-600 mb-0.5">
            {message.user}
          </span>
        )}
        <div
          className={`max-w-xs md:max-w-md p-2 pb-5 pr-8 rounded-lg relative animate-fadeIn transition ${
            isOwn
              ? "bg-primary text-white hover:bg-primary-dark"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          <span
            className={`text-xs absolute bottom-1 right-1 ${
              isOwn ? "text-gray-200" : "text-gray-500"
            }`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      {isOwn && message.avatar && (
        <img
          src={message.avatar}
          alt="avatar"
          className="w-6 h-6 rounded-full ml-2"
        />
      )}
    </div>
  );
}
