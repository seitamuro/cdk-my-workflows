import { CognitoJwtPayload } from "aws-jwt-verify/jwt-model";
import { createFactory } from "hono/factory";

export interface Env {
  Variables: {
    payload: CognitoJwtPayload;
  };
}

export const factory = createFactory<Env>();
