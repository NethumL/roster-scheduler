import Iron from '@hapi/iron';
import { getTokenCookie, MAX_AGE, setTokenCookie } from './cookies';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export async function setLoginSession(res, session) {
  const createdAt = Date.now();
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);
  setTokenCookie(res, token);
}

/**
 * @typedef {import('../models/User').UserEntity & {createdAt: number, maxAge: number}} Session
 */

/**
 * @returns {Promise<Session>}
 */
export async function getLoginSession(req) {
  const token = getTokenCookie(req);

  if (!token) {
    throw new Error('No token');
  }

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  if (!session) {
    throw new Error('No session');
  }

  return session;
}

/**
 * @returns {Promise<import('../models/User').UserEntity>}
 */
export async function getUser(req) {
  const { createdAt, maxAge, ...user } = await getLoginSession(req);
  return user;
}
