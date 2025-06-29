import dynamic from 'next/dynamic';
const ReelsUploader = dynamic(() => import('../../components/ReelsUploader'), { ssr: false });

export default function UploadReelPage() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <ReelsUploader />
    </div>
  );
}