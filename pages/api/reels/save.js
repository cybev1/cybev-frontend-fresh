export default async function handler(req, res) {
  const { reelId, userId } = req.body;

  if (!reelId || !userId) {
    return res.status(400).json({ error: 'Missing reelId or userId' });
  }

  // Simulated save logic (could store to user bookmarks collection)
  res.status(200).json({ success: true, message: 'Saved to bookmarks' });
}
