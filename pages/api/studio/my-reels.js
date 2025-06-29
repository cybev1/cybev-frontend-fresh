
import dbConnect from '../../../lib/mongodb';
import Reel from '../../../models/Reel';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: 'Username required' });
    const reels = await Reel.find({ username }).sort({ createdAt: -1 });
    return res.status(200).json({ reels });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing reel ID' });
    await Reel.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Reel deleted' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
