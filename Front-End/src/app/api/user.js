// pages/api/user.js
import { getSession } from '@auth0/nextjs-auth0';

export default async function user(req, res) {
  const session = getSession(req, res);
  if (!session) {
    res.status(401).end('Unauthorized');
    return;
  }
  const { user } = session;
  res.status(200).json({ email: user.email });
}
