import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

export const getCredentials = async (idToken: string) => {
  const credentialProvider = fromCognitoIdentityPool({
    client: new CognitoIdentityClient({}),
    identityPoolId: process.env.IDENTITY_POOL_ID!,
    logins: {
      [`cognito-idp.us-east-1.amazonaws.com/${process.env.USER_POOL_ID}`]:
        idToken,
    },
  });

  return await credentialProvider();
};
