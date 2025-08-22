// /app/api/edit/route.js
import { NextResponse } from "next/server";

const BASE_URL = "https://backend-nextjs-virid.vercel.app/api/users";

// ✅ ดึง user ตาม id
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // รับ id จาก query เช่น /api/edit?id=123

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ อัปเดต user
export async function PUT(req) {
  try {
    const body = await req.json();

    const res = await fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: "Update failed", detail: data }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
