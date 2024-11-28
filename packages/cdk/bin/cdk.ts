#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { AuthStack } from "../lib/auth-stack";

const app = new cdk.App();
new AuthStack(app, "AuthStack");
