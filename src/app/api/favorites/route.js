import { db } from '../db/db';
import { cookies } from 'next/headers';


export async function GET(request) {
  console.log('FETCHING FAVES');
  const cookieStore = cookies().get('REAL-ESTATE-WEBAPP');

  let favorites;

  try {
    const session = await db.Session.findOne({ session: cookieStore.value });
    console.log(session);
    favorites = session.houses;
  } catch (error) {
    console.log('ERROR: ', error);
  }

  return new Response(JSON.stringify(favorites), { status: 200 });
}

