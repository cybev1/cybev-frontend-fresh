export default function BlogPreviewCard({ title = "Untitled", description = "No description", author = "Anonymous" }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <div className="text-sm text-gray-500">By {author}</div>
    </div>
  );
}
