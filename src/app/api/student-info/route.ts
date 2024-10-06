// TODO: POST route to return details of students in the postgres DB
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// get payload data
import config from "@payload-config";
import { getPayload } from "payload";

export async function GET(request: NextRequest) {
  const apiKey = headers().get('x-api-key');

  // TODO: get searchParams
  const searchParams = request.nextUrl.searchParams;

  if (apiKey !== process.env.APP_API_KEY) {
    return NextResponse.json({
      status: false,
      message: "Invalid API KEY provided"
    });
  }

  // TODO: validate the params
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  if (!code || !email) {
    return NextResponse.json({
      status: false,
      message: "Incomplete params supplied to URL"
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
      }, { status: 404 })
    }

    // return data
    return NextResponse.json({
      status: false,
      message: "Student data found",
      data: userData.docs
    })


  } catch (error: any) {
    return NextResponse.json({
      status: false,
      message: "An error occured while fetching student data"
    }, { status: 500 })
  }
}
