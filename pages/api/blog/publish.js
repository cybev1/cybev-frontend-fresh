import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const { title, description, content, author, category, tags, template } = req.body;

    if (!title || !description || !author) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await db.collection('blogs').insertOne({
      title,
      description,
      content: content || '',
      author,
      category: category || 'General',
      tags: tags || [],
      template: template || 'default',
      createdAt: new Date(),
    });

    return res.status(201).json({ message: 'Blog published', id: result.insertedId });
  } catch (error) {
    console.error('Error publishing blog:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
