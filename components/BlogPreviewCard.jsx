export default function BlogPreviewCard({ title = 'Untitled', description = 'No description available', author = 'Unknown' }) {
  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Author: {author}</p>
    </div>
  );
}
