import dbClient from "@/db";
import { TypedData } from "@/types";
import { verifyTypedData } from "viem";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const address = url.searchParams.get("address");

    if (!address) {
      return new Response("Address parameter is missing", { status: 400 });
    }

    const client = await dbClient.connect();

    try {
      const result = await client.query(
        "SELECT * FROM project WHERE address = $1",
        [address]
      );

      if (result.rows.length > 0) {
        return new Response(JSON.stringify(result.rows[0]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response("Project not found", { status: 404 });
      }
    } finally {
      client.release();
    }
  } catch (e) {
    console.log(e);
    return new Response("Could not fetch project", {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify("Method Not Allowed"), { status: 405 });
  }

  try {
    const body: {
      payload: TypedData;
      signature: string;
    } = await req.json();

    if (!body.payload || !body.signature) {
      return new Response(JSON.stringify("Could not add project."), {
        status: 400,
      });
    }

    const { types, message, domain } = body.payload;

    const valid = await verifyTypedData({
      address: body.payload.message.signer as `0x${string}`,
      domain,
      types,
      primaryType: "NewProject",
      message,
      signature: body.signature as `0x${string}`,
    });

    if (valid) {
      const query = `
        INSERT INTO "project" (
          "address",
          "name",
          "description",
          "goal",
          "avatar_url",
          "website_url",
          "valid_to_timestamp"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;

      const values = [
        body.payload.message.signer,
        body.payload.message.projectName,
        body.payload.message.description,
        body.payload.message.goal,
        body.payload.message.imageUrl,
        body.payload.message.website,
        body.payload.message.deadline,
      ];
      const client = await dbClient.connect();

      try {
        await client.query(query, values);

        return new Response("success", {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } finally {
        client.release();
      }
    }

    return new Response(JSON.stringify("Invalid signature."), {
      status: 400,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify("Internal Server Error"), {
      status: 500,
    });
  }
};
