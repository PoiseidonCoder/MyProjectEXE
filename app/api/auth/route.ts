export async function POST(request: Request) {
    const res = await request.json();
    const token = res.token;
    if (!token) {
        return Response.json(
            { message: "Not receive token!" },
            { status: 400 }
        );
    }
    return Response.json(
        { res },
        {
            status: 200,
            headers: { "Set-Cookie": `sessionToken=${token}; Path=/;HttpOnly` },
        }
    );
}

export async function DELETE() {
    return new Response(JSON.stringify({ message: "Session deleted" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `sessionToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`,
        },
    });
}
