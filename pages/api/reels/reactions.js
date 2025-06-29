// pages/api/reels/reactions.js
import dbConnect from '@/lib/dbConnect';
import Reel from '@/models/Reel';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'POST':
      const { type, user } = req.body;
      if (!type || !user) return res.status(400).json({ success: false, message: 'Missing data' });

      try {
        const updated = await Reel.findByIdAndUpdate(
          id,
          { $push: { reactions: { type, user, timestamp: new Date() } } },
          { new: true }
        );
        res.status(200).json({ success: true, data: updated });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'GET':
      try {
        const reel = await Reel.findById(id).select('reactions');
        res.status(200).json({ success: true, data: reel.reactions });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
