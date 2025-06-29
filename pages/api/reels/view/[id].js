
import dbConnect from '@/lib/dbConnect';
import Reel from '@/models/Reel';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  try {
    const reel = await Reel.findById(id);
    if (!reel) return res.status(404).json({ error: 'Reel not found' });

    reel.views = (reel.views || 0) + 1;
    await reel.save();

    res.status(200).json(reel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load reel' });
  }
}
