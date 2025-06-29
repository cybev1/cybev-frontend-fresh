
export default function MetricsStrip({ views = 0, likes = 0, shares = 0 }) {
  return (
    <div className="flex justify-around text-sm text-gray-300 w-full mt-2">
      <div>👁 {views} Views</div>
      <div>❤️ {likes} Likes</div>
      <div>🔁 {shares} Shares</div>
    </div>
  );
}
