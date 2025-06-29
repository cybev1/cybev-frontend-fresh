
import dbConnect from '@/lib/mongodb';
import Reel from '@/models/Reel';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  if (method === 'POST') {
    const { reelId, type } = req.body;

    try {
      const reel = await Reel.findById(reelId);
      if (!reel) return res.status(404).json({ error: 'Reel not found' });

      if (type === 'like') {
        reel.likes = (reel.likes || 0) + 1;
      } else if (type === 'view') {
        reel.views = (reel.views || 0) + 1;
      }

      await reel.save();
      res.status(200).json({ message: 'Updated successfully', reel });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update reel' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
