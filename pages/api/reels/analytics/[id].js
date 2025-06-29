
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const client = await clientPromise;
  const db = client.db();

  switch (method) {
    case 'GET':
      try {
        const stats = await db.collection('reels').findOne(
          { _id: id },
          {
            projection: {
              views: 1,
              shares: 1,
              mints: 1,
              earnings: 1,
              saves: 1,
            },
          }
        );
        res.status(200).json(stats || {});
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
