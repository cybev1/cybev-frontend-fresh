
import dbConnect from '@/lib/dbConnect';
import ReelComment from '@/models/ReelComment';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const comments = await ReelComment.find({ reelId: id }).sort({ createdAt: -1 });
    return res.status(200).json({ comments });
  }

  if (req.method === 'POST') {
    const { text } = req.body;
    const comment = await ReelComment.create({ reelId: id, text });
    return res.status(201).json({ comment });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
