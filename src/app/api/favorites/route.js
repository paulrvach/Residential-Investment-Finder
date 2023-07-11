import { db } from '../db/db';
import { cookies } from 'next/headers';


// if incoming request has cookies fetch the database otherwise create cookie and send it back



export async function POST(request) {
  const {data} = await request.json();
  const sessionId = cookies().get('REAL-ESTATE-WEBAPP').value;
  const options = { new: true };
  const newHouse = { address: data.address, data: data };
  const session = await db.Session.findOneAndUpdate(
    { session: sessionId },
    { $push: { houses: newHouse } },
    options
  );

  return new Response(JSON.stringify(session), {
    status: 200,
  });
}

export async function GET(request) {
  
}
