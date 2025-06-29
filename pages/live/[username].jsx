import { useRouter } from 'next/router';

export default function LivePage() {
  const { username } = useRouter().query;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-2xl font-bold mb-4">🔴 {username}'s Live Stream</h1>
      <div className="w-full max-w-3xl h-64 bg-black rounded-lg shadow-lg mb-4 flex items-center justify-center text-white">
        <p>Live stream content goes here...</p>
      </div>
      <button onClick={() => history.back()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        ⬅️ Back
      </button>
    </div>
  );
}