import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'GET') return res.status(405).end();

  try {
    const client = await clientPromise;
    const db = client.db();
    const reel = await db.collection('reels').findOne({ _id: id });

    if (!reel) return res.status(404).json({ error: 'Reel not found' });

    res.status(200).json({
      isMinted: !!reel.mintedAt,
      mintedAt: reel.mintedAt || null,
      earnings: reel.earnings || 0,
      views: reel.views || 0,
      shares: reel.shares || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
