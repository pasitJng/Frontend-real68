// /app/api/users/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://itdev.cmtc.ac.th:3000/api/users", {
      cache: "no-store", // ป้องกันการ cache
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// สำหรับการลบ
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
