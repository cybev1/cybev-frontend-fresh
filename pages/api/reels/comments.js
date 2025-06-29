// pages/api/reels/comments.js
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('reelComments');

  if (req.method === 'POST') {
    const { reelId, username, comment } = req.body;
    const timestamp = new Date();
    await collection.insertOne({ reelId, username, comment, timestamp });
    return res.status(200).json({ message: 'Comment added' });
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    const comments = await collection.find({ reelId: id }).sort({ timestamp: -1 }).toArray();
    return res.status(200).json(comments);
  }

  res.status(405).end(); // Method Not Allowed
}