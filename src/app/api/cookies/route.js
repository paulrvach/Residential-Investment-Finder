import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { db } from '../db/db';
import { cookies } from 'next/headers';

const MAX_AGE = 60 * 60 * 24 * 7; // days;
const COOKIE_NAME = 'REAL-ESTATE-WEBAPP';

export async function POST(request) {
  const cookieStore = cookies().get('REAL-ESTATE-WEBAPP');
  if (!cookieStore) {
    console.log('CREATING COOKIE')
    // Always check this
    const secret = process.env.JWT_SECRET || '123';

    const token = sign(
      {
        username: 'username',
      },
      secret,
      {
        expiresIn: MAX_AGE,
      }
    );

    const seralized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });

    const response = {
      message: 'Session Created`',
    };

    async function addSession(sessionId, houses) {
      const newSession = new db.Session({
        session: sessionId,
        houses: houses,
      });

      try {
        await newSession.save();
        console.log('New session saved');
      } catch (err) {
        console.error('Error saving session:', err);
      }
    }

    await addSession(token, []);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Set-Cookie': seralized },
    });
  } else {
    console.log('FETCHING FAVES')
    let favorites;

    try {
      const session = await db.Session.findOne({ session: cookieStore.value });
      console.log(session)
      favorites = session.houses;
    } catch (error) {
      console.log('ERROR: ',error);
    }

    return new Response(JSON.stringify(favorites), { status: 200 });
  }
}
