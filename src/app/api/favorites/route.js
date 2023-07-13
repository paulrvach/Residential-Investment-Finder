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

export async function POST(request) {
  const cookieStore = cookies().get('REAL-ESTATE-WEBAPP');
  const options = { new: true }; // returns the updated document
  const sessionId = cookieStore.value;
  const { data } = await request.json();

  try {
    const session = await db.Session.findOneAndUpdate(
      { session: sessionId },
      { $pull: { houses: { address: data.address } } },
      options
    );
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (err) {
    return new Response('Error updating session:', err);
  }
}

export async function DELETE(request) {
  const cookieStore = cookies().get('REAL-ESTATE-WEBAPP');
  const options = { new: true }; // returns the updated document
  const sessionId = cookieStore.value;
  const { data } = await request.json();

  try {
    const session = await db.Session.findOneAndDelete(
      { session: sessionId },
      options
    );
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    return new Response('Error updating session:', err);
  }
}
