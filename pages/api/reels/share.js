export default async function handler(req, res) {
  const { reelId, platform } = req.body;

  if (!reelId || !platform) {
    return res.status(400).json({ error: 'Missing reelId or platform' });
  }

  // Simulated share action (could log to DB)
  res.status(200).json({ success: true, message: 'Shared successfully on ' + platform });
}
