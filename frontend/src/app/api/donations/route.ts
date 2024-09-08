import dbClient from "@/db";

export const GET = async () => {
  try {
    const client = await dbClient.connect();

    try {
      const result = await client.query("SELECT * FROM donation");

      if (result.rows) {
        return Response.json(result.rows, { status: 200 });
      }

      return new Response("Could not fetch donations", {
        status: 500,
      });
    } finally {
      client.release();
    }
  } catch (e) {
    console.log(e);
    return new Response("Could not fetch donations", {
      status: 500,
    });
  }
};
