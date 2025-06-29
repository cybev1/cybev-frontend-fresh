import React from 'react';

export default function BlogPreviewCard({ title = 'Untitled', description = 'No description', author = 'Anonymous' }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-1">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{description}</p>
      <span className="text-sm text-gray-500">By {author}</span>
    </div>
  );
}
