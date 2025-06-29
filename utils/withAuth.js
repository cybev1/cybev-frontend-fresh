import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
      if (!user) {
        router.push('/auth/login');
      }
    }, [user]);

    if (!user) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;