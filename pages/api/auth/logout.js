import { serialize } from 'cookie';

export default function handler(req, res) {
    console.log("IM HERE::: /api/auth/logout");
    res.setHeader('Set-Cookie', serialize('session', '', {
        httpOnly: true,
        path: '/',
        maxAge: -1,  // Immediately expire the cookie
    }));

    console.log("IM HERE:", res.status);

    // Optionally redirect or just send a success status
    res.status(200).json({ message: 'Logged out successfully' });
    console.log("IM HERE:", res.status);
}
