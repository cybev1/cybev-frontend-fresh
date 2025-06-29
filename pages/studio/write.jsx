
import PostEditor from '@/components/PostEditor';
export default function WriteBlogPostPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Write Blog Post</h1>
      <PostEditor blogMode />
    </div>
  );
}
