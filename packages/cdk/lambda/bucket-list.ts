import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  const token = event.headers.Authorization || "";
  const credentialProvider = fromCognitoIdentityPool({
    client: new CognitoIdentityClient({}),
    identityPoolId: process.env.IDENTITY_POOL_ID || "",
    logins: {
      [`cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USER_POOL_ID}`]:
        token,
    },
  });

  const credentials = await credentialProvider()
    .then((data) => data)
    .catch(() => null);

  if (!credentials) {
    console.error("No authorization token provided");
    return {
      statusCode: 401,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "No authorization token provided",
      }),
    };
  }

  try {
    const s3Client = new S3Client({
      credentials: credentials,
    });

    const buckets = await s3Client.send(new ListBucketsCommand({}));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        buckets: buckets.Buckets?.map((bucket) => bucket.Name),
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Failed to get bucket list",
      }),
    };
  }
};
