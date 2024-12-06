#!/bin/bash

set -eu

function extract_value {
  aws cloudformation describe-stacks --stack-name $1 --output json | jq -r ".Stacks[0].Outputs[] | select(.OutputKey==\"$2\") | .OutputValue"
}

USER_POOL_ID=$(extract_value "AuthStack" "UserPoolId")
USER_POOL_CLIENT_ID=$(extract_value "AuthStack" "UserPoolClientId")

aws cognito-idp admin-initiate-auth --user-pool-id $USER_POOL_ID --client-id $USER_POOL_CLIENT_ID --auth-flow ADMIN_NO_SRP_AUTH --auth-parameters USERNAME=seitaroumiura@gmail.com,PASSWORD=XXXXXXXX > tokens.json