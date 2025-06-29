
import { useRouter } from 'next/router';

export default function PostAnalyticsPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Post Analytics</h1>
        <p className="text-gray-600 mt-4">Analytics for post ID: {id}</p>
      </div>
    </div>
  );
}
