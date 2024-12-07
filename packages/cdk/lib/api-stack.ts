import * as cdk from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface CustomProps extends cdk.StackProps {
  userPool: cognito.UserPool;
  userPoolClient: cognito.UserPoolClient;
  identityPool: cognito.CfnIdentityPool;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CustomProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "Bucket");

    const lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      entry: "lambda/lambdalith.ts",
      handler: "handler",
      environment: {
        USER_POOL_ID: props.userPool.userPoolId,
        USER_POOL_CLIENT_ID: props.userPoolClient.userPoolClientId,
        IDENTITY_POOL_ID: props.identityPool.ref,
        BUCKET_NAME: bucket.bucketName,
      },
    });

    const api = new LambdaRestApi(this, "LambdalithApi", {
      handler: lambdaFunction,
    });

    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: api.url ?? "Something went wrong with the deploy",
    });

    new cdk.CfnOutput(this, "BucketName", {
      value: bucket.bucketName,
    });
  }
}
