import Layout from '@/components/common/Layout';
import { useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(pageProps?.user);

  return (
    <Layout user={user} setUser={setUser}>
      <Component {...pageProps} user={user} setUser={setUser} />
    </Layout>
  );
}

export default MyApp;
