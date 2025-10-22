import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // This will decode AND return the raw JWT if present in cookies or headers
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      raw: true, // 👈 this gives the actual encoded JWT string
    });

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    return NextResponse.json({ jwt: token }, { status: 200 });
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
