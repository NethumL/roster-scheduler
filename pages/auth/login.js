import { getLoginSession } from '@/lib/auth/session';
import Router from 'next/router';
import { useRef, useState } from 'react';

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState('');

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  /** @type import('react').FormEventHandler<HTMLFormElement> */
  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      Router.push('/');
    } else {
      setErrorMsg(await res.text());
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <div className="error">Error: {errorMsg}</div>}
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" ref={usernameRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getServerSideProps(context) {
  try {
    const session = await getLoginSession(context.req);
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } catch (error) {}

  return { props: {} };
}
