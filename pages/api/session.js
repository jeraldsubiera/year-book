import { parse } from 'cookie';

export default function handler(req, res) {
  const cookies = req.headers.cookie;

  console.log(cookies);

  if (!cookies) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const parsedCookies = parse(cookies);
  const sessionCookie = parsedCookies.session;

  if (!sessionCookie) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // Parse session JSON (the user info you stored earlier)
    const session = JSON.parse(sessionCookie);
    return res.status(200).json({ user: session });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid session data' });
  }
}
