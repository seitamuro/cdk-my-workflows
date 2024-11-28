import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    // Authorization headerからJWTトークンを取得
    const token = event.headers.Authorization;
    if (!token) {
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

    const s3Client = new S3Client({
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({}),
        identityPoolId: process.env.IDENTITY_POOL_ID || "",
        logins: {
          [`cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USER_POOL_ID}`]:
            token,
        },
      }),
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
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
