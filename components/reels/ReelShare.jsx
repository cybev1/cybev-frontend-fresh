
import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';

export default function ReelShare({ reelId }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? `${window.location.origin}/reels/${reelId}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-4 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 hover:text-blue-600"
      >
        <Copy className="w-4 h-4" />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=Check this reel on CYBEV&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-indigo-600"
      >
        <Share2 className="w-4 h-4" />
        Share
      </a>
    </div>
  );
}
