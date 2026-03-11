import React from 'react';

export default function Header({ user, onLogout }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-3">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="font-semibold text-lg text-gray-800">
          {user?.name}
        </span>
      </div>
      <button
        onClick={onLogout}
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
      >
        Logout
      </button>
    </header>
  );
}
