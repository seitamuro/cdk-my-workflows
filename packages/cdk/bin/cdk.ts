#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { ApiStack } from "../lib/api-stack";
import { AuthStack } from "../lib/auth-stack";

const app = new cdk.App();
const auth = new AuthStack(app, "AuthStack");
new ApiStack(app, "ApiStack", {
  userPool: auth.userPool,
  identityPool: auth.identityPool,
});
