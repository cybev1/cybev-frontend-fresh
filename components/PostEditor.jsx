export default function PostEditor() {
  return (
    <div className="w-full p-4 bg-white shadow rounded">
      <textarea className="w-full h-40 border p-2 rounded" placeholder="Write something amazing..." />
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Post</button>
    </div>
  );
}