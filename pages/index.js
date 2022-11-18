import { getUser } from '@/lib/auth/session';
import { Link as MUILink } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

/**
 * @param {{user: import('@/lib/models/User').UserEntity|null}} props
 */
export default function Home({ user }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Constraint Based Roster scheduler" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Roster Scheduler!</h1>
        {user ? (
          <>
            <MUILink component={Link} href="/preferences">
              Preferences
            </MUILink>
            <MUILink component={Link} href="/api/logout">
              Logout
            </MUILink>
          </>
        ) : (
          <MUILink component={Link} href="/auth/login">
            Login
          </MUILink>
        )}
      </main>
    </div>
  );
}

/** @type {import('next').GetServerSideProps} */
export async function getServerSideProps(context) {
  try {
    const user = await getUser(context.req);
    return { props: { user } };
  } catch (error) {
    return {
      props: {},
    };
  }
}
