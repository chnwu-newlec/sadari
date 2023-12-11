import { NextResponse } from "next/server";

function getRandomElement(arr: any[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export async function POST(request: Request) {
  const { pwd } = await request.json();

  if (pwd !== process.env.AUTH_PWD)
    return NextResponse.json(
      { error: "Auth Error" },
      { status: 401, headers: { "Content-Type": "application/json" } }
    );

  const listData = process.env.LIST;
  if (!listData)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );

  const list = listData.split(",");

  return NextResponse.json(
    { name: getRandomElement(list) },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
