import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./middleware/auth";
import { getCredentials } from "./utils/getCredentials";

export const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app.get("/bucket-list", auth, async (c) => {
  const token = c.req.header("Authorization")!;

  const credentials = await getCredentials(token);

  if (!credentials) {
    return c.json({
      statusCode: 401,
      body: {
        message: "No authorization token provided",
      },
    });
  }

  try {
    const s3Client = new S3Client({
      credentials: credentials,
    });

    const buckets = await s3Client.send(new ListBucketsCommand({}));

    return c.json({
      statusCode: 200,
      buckets: buckets.Buckets?.map((bucket) => bucket.Name),
    });
  } catch (e) {
    return c.json({
      statusCode: 500,
      body: {
        message: "Failed to get bucket list",
      },
    });
  }
});

export const handler = handle(app);
