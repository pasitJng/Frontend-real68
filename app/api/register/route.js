// app/api/users/route.js
export async function POST(req) {
  try {
    const body = await req.json();

    // ส่งต่อไปยัง API จริง (backend-nextjs-virid)
    const response = await fetch("https://backend-nextjs-virid.vercel.app/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
