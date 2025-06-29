export default function handler(req, res) {
  const reels = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    videoUrl: `/videos/sample${(i % 3) + 1}.mp4`,
    title: `Sample Reel ${i + 1}`,
  }));
  res.status(200).json(reels);
}