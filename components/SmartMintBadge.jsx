import React from 'react';
import { BadgeCheck } from 'lucide-react';

export default function SmartMintBadge({ mintedAt }) {
  if (!mintedAt) return null;

  const date = new Date(mintedAt).toLocaleDateString();

  return (
    <div className="flex items-center text-sm text-green-600 dark:text-green-400 gap-1 mt-2">
      <BadgeCheck className="w-4 h-4" />
      <span>Minted on {date}</span>
    </div>
  );
}
