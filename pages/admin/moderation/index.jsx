import { useState, useEffect } from 'react';

export default function ContentModerationDashboard() {
  const [reportedContent, setReportedContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/moderation/reports')
      .then((res) => res.json())
      .then((data) => {
        setReportedContent(data.reports);
        setLoading(false);
      });
  }, []);

  const handleAction = async (contentId, action) => {
    await fetch(`/api/moderation/${contentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    });

    setReportedContent((prev) =>
      prev.map((content) => (content._id === contentId ? { ...content, status: action } : content))
    );
  };

  const handleDelete = async (contentId) => {
    await fetch(`/api/moderation/${contentId}`, { method: 'DELETE' });
    setReportedContent((prev) => prev.filter((content) => content._id !== contentId));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Content Moderation Dashboard</h2>
      <div className="space-y-4">
        {reportedContent.map((content) => (
          <div key={content._id} className="p-4 bg-gray-200 rounded-lg">
            <h3 className="font-semibold">{content.title || content.comment}</h3>
            <p>Reported by: {content.userId}</p>
            <p>Reason: {content.reason}</p>
            <p>Status: {content.status}</p>
            <button
              onClick={() => handleAction(content._id, 'approve')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(content._id, 'reject')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Reject
            </button>
            <button
              onClick={() => handleDelete(content._id)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
