import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const boostCount = post.boostCount || 0;
    res.status(200).json({ boostCount });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}