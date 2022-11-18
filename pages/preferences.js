import { getUser } from '@/lib/auth/session';
import Head from 'next/head';

/**
 * @param {{user: import('@/lib/models/User').UserEntity}} props
 */
export default function Preferences({ user }) {
  return (
    <>
      <Head>
        <title>Preferences</title>
      </Head>
      <h1>Preferences</h1>
      <p>{user.name}</p>
    </>
  );
}

/** @type {import('next').GetServerSideProps} */
export async function getServerSideProps(context) {
  try {
    const user = await getUser(context.req);
    return { props: { user } };
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
