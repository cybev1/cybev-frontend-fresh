import React from 'react';
import { Rocket } from 'lucide-react';

export default function BoostTrackerCard({ boosts = 0 }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span className="text-sm text-gray-800 dark:text-gray-100">Boosts:</span>
      </div>
      <span className="font-semibold text-gray-900 dark:text-white">{boosts}</span>
    </div>
  );
}
