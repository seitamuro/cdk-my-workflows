import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface CustomProps extends cdk.StackProps {
  userPool: cognito.UserPool;
  identityPool: cognito.CfnIdentityPool;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CustomProps) {
    super(scope, id, props);

    const api = new apigw.RestApi(this, "Api", {
      deployOptions: {
        stageName: "prod",
      },
      deploy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: ["Authorization"],
      },
    });

    const authorizer = new apigw.CognitoUserPoolsAuthorizer(
      this,
      "Authorizer",
      {
        cognitoUserPools: [props.userPool],
      }
    );

    const getBucketsListLambda = new NodejsFunction(
      this,
      "GetBucketsListLambda",
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: "lambda/bucket-list.ts",
        handler: "handler",
        bundling: {
          minify: true,
          sourceMap: true,
        },
        environment: {
          IDENTITY_POOL_ID: props.identityPool.ref,
          USER_POOL_ID: props.userPool.userPoolId,
        },
      }
    );
    const bucketListResource = api.root.addResource("bucket-list");
    bucketListResource.addMethod(
      "GET",
      new apigw.LambdaIntegration(getBucketsListLambda, {}),
      {
        authorizer: authorizer,
      }
    );

    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: api.url ?? "Something went wrong with the deploy",
    });
  }
}
