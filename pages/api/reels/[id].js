// Backend API: Fetch reel data with views, reactions, and shares
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Reel ID is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch reel data along with its metrics (views, reactions, shares)
    const result = await db.collection('reels').aggregate([
      {
        $match: { _id: ObjectId(id) } // Match reel by ID
      },
      {
        $lookup: {
          from: 'reactions',
          localField: '_id',
          foreignField: 'reelId',
          as: 'reactions'
        }
      },
      {
        $lookup: {
          from: 'shares',
          localField: '_id',
          foreignField: 'reelId',
          as: 'shares'
        }
      },
      {
        $project: {
          videoUrl: 1,
          caption: 1,
          user: 1,
          views: 1,
          reactions: { $size: '$reactions' },
          shares: { $size: '$shares' }
        }
      }
    ]).toArray();

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'Reel not found' });
    }

    return res.status(200).json({
      success: true,
      reel: result[0]
    });
  } catch (error) {
    console.error('Error fetching reel data:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
