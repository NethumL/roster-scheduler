import Layout from '@/components/common/Layout';
import { getUser } from '@/lib/auth/session';
import App from 'next/app';
import { useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps, user: initialUser }) {
  const [user, setUser] = useState(initialUser);

  return (
    <Layout user={user} setUser={setUser}>
      <Component {...pageProps} user={user} setUser={setUser} />
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
