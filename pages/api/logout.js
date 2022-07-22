import { removeTokenCookie } from '@/lib/auth/cookies';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function logout(req, res) {
  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' });
  res.end();
}
