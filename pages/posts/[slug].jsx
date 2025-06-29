import { useRouter } from 'next/router';

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query; // Use 'slug' for identifying the post

  return (
    <div>
      <h1>{slug}</h1> {/* Render the post based on slug */}
    </div>
  );
}
