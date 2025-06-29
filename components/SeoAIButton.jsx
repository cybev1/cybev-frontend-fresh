import { useState } from 'react';

export default function SeoAIButton({ onGenerate }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await onGenerate?.();
    } catch (e) {
      console.error('SEO generation failed', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
    >
      {loading ? 'Generating...' : 'AI Generate SEO'}
    </button>
  );
}
