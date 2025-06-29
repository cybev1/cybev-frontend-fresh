
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import Reel from '../../../models/Reel';

const CommentSchema = new mongoose.Schema({
  reelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reel', required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { reelId, username, text } = req.body;

    if (!reelId || !username || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const comment = await Comment.create({ reelId, username, text });
    return res.status(201).json({ comment });
  }

  if (req.method === 'GET') {
    const { reelId } = req.query;
    const comments = await Comment.find({ reelId }).sort({ createdAt: -1 });
    return res.status(200).json({ comments });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
