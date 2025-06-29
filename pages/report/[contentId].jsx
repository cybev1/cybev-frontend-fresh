import { useState } from 'react';

export default function ReportContent() {
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleReport = async () => {
    const userId = 'user-id-placeholder'; // Replace with actual user ID
    await fetch(`/api/reports/${contentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, reason }),
    });

    setMessage('Your report has been submitted!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Report Inappropriate Content</h2>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Why are you reporting this content?"
        className="w-full p-2 border rounded-lg"
      />
      <button onClick={handleReport} className="px-4 py-2 bg-red-600 text-white rounded-lg mt-4">
        Report Content
      </button>
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
}
