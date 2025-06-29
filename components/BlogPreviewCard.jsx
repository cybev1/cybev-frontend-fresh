import React from 'react';

export default function BlogPreviewCard({ title, description, image, domain }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <img src={image || '/placeholder.png'} alt="Preview" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-blue-500 mt-2">{domain}</p>
      </div>
    </div>
  );
}
