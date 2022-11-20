import Layout from '@/components/common/Layout';
import { getUser } from '@/lib/auth/session';
import { CircularProgress } from '@mui/material';
import App from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps, user: initialUser }) {
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <Layout user={user} setUser={setUser}>
      <Component {...pageProps} user={user} setUser={setUser} />
      {isLoading && (
        <CircularProgress
          disableShrink
          color="primary"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'absolute',
            right: '20px',
            bottom: '20px',
          }}
        />
      )}
    </Layout>
  );
}

/**
 * @param {import('next/app').AppContext} ctx
 * @returns {Promise<import('next/app').AppInitialProps>}
 */
MyApp.getInitialProps = async (ctx) => {
  const context = await App.getInitialProps(ctx);
  try {
    const user = await getUser(ctx.ctx.req);
    return { ...context.pageProps, user };
  } catch {
    return { ...context.pageProps };
  }
};

export default MyApp;
