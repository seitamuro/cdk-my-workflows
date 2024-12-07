import {
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
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

app.post("/s3-upload", auth, async (c) => {
  const body = await c.req.parseBody();
  if (!body["file"]) {
    console.log("No file provided");
    c.status(400);
    return c.text("No file provided");
  }

  const file = body["file"] as File;
  const credentials = await getCredentials(c.req.header("Authorization")!);
  console.log(file.name);
  const client = new S3Client({
    credentials: credentials,
  });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: file.name,
        Body: buffer,
        ContentType: file.type,
      })
    );
  } catch (e) {
    console.log(e);
    return c.json(
      {
        message: "Failed to upload file",
      },
      500
    );
  }
  return c.json(
    {
      message: "File uploaded successfully",
    },
    200
  );
});

/*app.post("/s3-upload", auth, async (c) => {
  try {
    const { file } = await c.req.parseBody();
    const credentials = await getCredentials(c.req.header("Authorization")!);
    const client = new S3Client({
      credentials: credentials,
    });

    if (!file) {
      return c.json({
        statusCode: 400,
        body: {
          message: "No file provided",
        },
      });
    }

    if (file instanceof File) {
      console.log("File name:", file.name);
      console.log("File size:", file.size);
    }

    const storage = new HonoS3Storage({
      bucket: "tmp-seimiura",
      key: (_, file) =>
        `${file.originalname}-${new Date().getTime()}.${file.extension}`,
      client: client,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      statusCode: 500,
      body: {
        message: "Failed to upload file",
      },
    });
  }

  return c.json({
    statusCode: 200,
    body: {
      message: "File uploaded successfully",
    },
  });
});*/

export const handler = handle(app);
