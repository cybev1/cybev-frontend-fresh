
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';

const EngagementSchema = new mongoose.Schema({
  reelId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reel' },
  username: { type: String, required: true },
  action: { type: String, enum: ['like', 'boost'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Engagement = mongoose.models.Engagement || mongoose.model('Engagement', EngagementSchema);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { reelId, username, action } = req.body;

    if (!reelId || !username || !action) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEngagement = await Engagement.create({ reelId, username, action });
    return res.status(201).json({ engagement: newEngagement });
  }

  if (req.method === 'GET') {
    const { reelId } = req.query;
    const likes = await Engagement.countDocuments({ reelId, action: 'like' });
    const boosts = await Engagement.countDocuments({ reelId, action: 'boost' });
    return res.status(200).json({ likes, boosts });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
