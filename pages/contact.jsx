
import Head from 'next/head';
import Layout from '@/components/Layout';


export default function Contact() {
  return (
    <Layout>
      <Head><title>Contact – CYBEV</title></Head>
      
<nav className="w-full fixed top-0 left-0 z-50 flex justify-between items-center px-6 py-4 shadow-sm backdrop-blur-md bg-white/70 dark:bg-black/70">
  <div className="text-xl font-bold text-blue-700 dark:text-white">CYBEV</div>
  <div className="hidden md:flex gap-5 items-center text-sm font-medium">
    <a href="/features" className="text-gray-700 dark:text-white hover:text-blue-600">Features</a>
    <a href="/setup" className="text-gray-700 dark:text-white hover:text-blue-600">Create a Blog</a>
    <a href="/timeline" className="text-gray-700 dark:text-white hover:text-blue-600">Timeline</a>
    <a href="/explore" className="text-gray-700 dark:text-white hover:text-blue-600">Explore</a>
    <a href="/about" className="text-gray-700 dark:text-white hover:text-blue-600">About Us</a>
    <a href="/contact" className="text-gray-700 dark:text-white hover:text-blue-600">Contact</a>
    <a href="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Get Started</a>
  </div>
</nav>


<div className="min-h-screen pt-32 p-10 text-center bg-white dark:bg-black text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">Have questions or suggestions? Reach out to our team.</p>
        <a href="mailto:support@cybev.io" className="text-blue-600 font-medium hover:underline">support@cybev.io</a>
      </div>
    </Layout>
  );
}
