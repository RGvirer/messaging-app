import React from 'react';

export default function Layout({ children, className = '' }) {
  // Basic full-height flex container; pages can add additional utility classes via className prop
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>{children}</div>
  );
}
