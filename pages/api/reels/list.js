
import dbConnect from '../../../lib/mongodb';
import Reel from '../../../models/Reel';

export default async function handler(req, res) {
  try {
    await dbConnect();
    const reels = await Reel.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json({ reels });
  } catch (error) {
    console.error('Reels fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch reels' });
  }
}
