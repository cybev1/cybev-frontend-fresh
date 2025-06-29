import React, { useState } from 'react';

export default function SeoAIButton({ onGenerate }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onGenerate();
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition"
    >
      {loading ? 'Generating SEO...' : 'AI GENERATE SEO'}
    </button>
  );
}
