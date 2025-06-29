import dbConnect from '@/lib/mongodb';
import Reel from '@/models/Reel';

export default async function handler(req, res) {
  await dbConnect();
  const page = parseInt(req.query.page || '1');
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const reels = await Reel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: 'Error loading reels', error });
  }
}