import '../styles/globals.css'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps, router }) {
  const noLayoutRoutes = ['/auth/login', '/auth/register'];
  const useLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      <>
        {useLayout ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </AuthProvider>
  );
}

export default MyApp;