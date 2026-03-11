import React from 'react';

export default function ChatInput({ text, setText, onSend }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="flex items-center p-3 bg-white shadow-inner"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-4 py-2 font-semibold text-white bg-primary rounded-r-md hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}
