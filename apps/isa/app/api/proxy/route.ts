import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const body = await req.json();
  console.log(body);
  try {
    const response = await fetch('https://mcstaging-clscolombia.gvposlat.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Store': 'LAFAMCOSELLER'
        // Forward any additional headers if necessary
        // Authorization, etc., if required:
        // 'Authorization': req.headers.get('authorization') ?? ''
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Respond back to the frontend with the response data
    return NextResponse.json(data);
  } catch (error) {
    // Handle any errors that occur
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}