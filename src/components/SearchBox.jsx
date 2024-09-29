import React from 'react';

export default function SearchBox({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
