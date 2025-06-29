import { useRouter } from 'next/router';

export default function LivestreamStreamer() {
  const router = useRouter();
  const { id } = router.query;

  const startLivestream = async () => {
    const response = await fetch(`/api/livestream/${id}`, {
      method: 'POST',
    });

    if (response.ok) {
      alert('Livestream started!');
    } else {
      alert('Failed to start livestream.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Start Your Livestream</h2>
      <button
        onClick={startLivestream}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Start Livestream
      </button>
    </div>
  );
}
