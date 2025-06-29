import { useState, useEffect } from 'react';

export default function AdminModerationDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        setReports(data.reports);
        setLoading(false);
      });
  }, []);

  const handleAction = async (contentId, action) => {
    await fetch(`/api/reports/${contentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });

    setReports((prev) => prev.map((report) => (report.contentId === contentId ? { ...report, status: action } : report)));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Content Moderation Dashboard</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.contentId} className="p-4 bg-gray-200 rounded-lg">
            <h3 className="font-semibold">{report.reason}</h3>
            <p>Status: {report.status}</p>
            <button
              onClick={() => handleAction(report.contentId, 'approve')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(report.contentId, 'reject')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
