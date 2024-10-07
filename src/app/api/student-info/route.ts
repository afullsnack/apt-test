// TODO: POST route to return details of students in the postgres DB
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// get payload data
import config from "@payload-config";
import { getPayload } from "payload";


export const OPTIONS = async (request:NextRequest) => {
  return new NextResponse('', { status: 200 });
}

export async function GET(request: NextRequest) {
  const apiKey = headers().get('x-api-key');

  // TODO: get searchParams
  const searchParams = request.nextUrl.searchParams;

  if (apiKey !== process.env.APP_API_KEY) {
    return NextResponse.json({
      status: false,
      message: "Invalid API KEY provided"
    }, {
      headers: {
        'Access-Control-Allow-Origin': 'https://rocu-admin.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      }
    });
  }

  // TODO: validate the params
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  if (!code || !email) {
    return NextResponse.json({
      status: false,
      message: "Incomplete params supplied to URL"
    }, {
      headers: {
        'Access-Control-Allow-Origin': 'https://rocu-admin.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      }
    });
  }

  // TODO: find and return user details
  try {
    const _payload = await getPayload({ config });

    const userData = await _payload.find({
      collection: 'users',
      where: {
        email: { equals: email },
        'access-code': { equals: code },
      }
    });


    // if no data found return 404
    if (!userData.docs.length) {
      return NextResponse.json({
        status: false,
        message: "Student not found!"
      }, {
        status: 404, headers: {
          'Access-Control-Allow-Origin': 'https://rocu-admin.vercel.app',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
        }
      })
    }

    // return data
    return NextResponse.json({
      status: false,
      message: "Student data found",
      data: {
        name: userData.docs[0]['full-name'],
        email: userData.docs[0]?.email
      }
    }, {
      headers: {
        'Access-Control-Allow-Origin': 'https://rocu-admin.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      }
    })


  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: "An error occured while fetching student data"
    }, {
      status: 500, headers: {
        'Access-Control-Allow-Origin': 'https://rocu-admin.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      }
    })
  }
}
