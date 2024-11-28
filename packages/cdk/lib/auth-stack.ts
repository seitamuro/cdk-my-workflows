import * as cdk from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class AuthStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, "UserPool", {
      selfSignUpEnabled: true,
      autoVerify: { email: true },
      signInAliases: { email: true },
    });

    const googleProvider = new cognito.UserPoolIdentityProviderGoogle(
      this,
      "GoogleOAuth",
      {
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
        clientSecretValue: cdk.SecretValue.unsafePlainText(
          process.env.GOOGLE_OAUTH_CLIENT_SECRET || ""
        ),
        userPool: userPool,
        scopes: ["email"],
        attributeMapping: {
          email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        },
      }
    );

    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      generateSecret: true,
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.GOOGLE,
      ],
      oAuth: {
        callbackUrls: ["http://localhost:5173"],
      },
    });
    userPoolClient.node.addDependency(googleProvider);

    userPool.addDomain("CognitoDomain", {
      cognitoDomain: {
        domainPrefix: "my-workflows-seimiura",
      },
    });

    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}
