import dbConnect from '@/lib/mongodb';
import Reel from '@/models/Reel';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const reels = await Reel.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json(reels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load reels' });
  }
}
