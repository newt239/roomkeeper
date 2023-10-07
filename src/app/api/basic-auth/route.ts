import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "パスワードが違います。" },
    {
      status: 401,
      headers: { "WWW-Authenticate": "Basic realm='secure_area'" },
    }
  );
}
