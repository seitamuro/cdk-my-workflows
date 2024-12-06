import { CognitoJwtVerifier } from "aws-jwt-verify";
import type { MiddlewareHandler } from "hono";

type ENV = {
  Variables: {
    payload: string;
  };
};

const USER_POOL_ID = process.env.USER_POOL_ID!;
const USER_POOL_CLIENT_ID = process.env.USER_POOL_CLIENT_ID!;

export const auth: MiddlewareHandler<ENV> = async (c, next) => {
  const token = c.req.header("Authorization")!;
  const verifier = CognitoJwtVerifier.create({
    userPoolId: USER_POOL_ID,
    clientId: USER_POOL_CLIENT_ID,
    tokenUse: "id",
  });

  try {
    const payload = await verifier.verify(token);
    c.set("payload", JSON.stringify(payload));
    await next();
  } catch (error) {
    c.json({
      statusCode: 401,
      body: {
        message: "Unauthorized",
      },
    });
  }
};
