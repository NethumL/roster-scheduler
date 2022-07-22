import { compareSync } from 'bcryptjs';

/**
 * @param {{password: string}} user
 * @param {string} password
 */
export function validatePassword(user, password) {
  return compareSync(password, user.password);
}
