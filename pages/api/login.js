import { localStrategy } from '@/lib/auth/password-local';
import { setLoginSession } from '@/lib/auth/session';
import nextConnect from 'next-connect';
import passport from 'passport';

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate('local', req, res);
      const { password: _, ...session } = user;

      await setLoginSession(res, session);

      // @ts-ignore
      res.status(200).send({ done: true });
    } catch (error) {
      console.error(error);
      // @ts-ignore
      res.status(401).send(error.message);
    }
  });
