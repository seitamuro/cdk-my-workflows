#!/bin/bash

set -eu

function extract_value {
  aws cloudformation describe-stacks --stack-name $1 --output json | jq -r ".Stacks[0].Outputs[] | select(.OutputKey==\"$2\") | .OutputValue"
}

export VITE_USER_POOL_ID=$(extract_value "AuthStack" "UserPoolId")
export VITE_USER_POOL_CLIENT_ID=$(extract_value "AuthStack" "UserPoolClientId")
export VITE_IDENTITY_POOL_ID=$(extract_value "AuthStack" "IdentityPoolId")
export VITE_API_ENDPOINT=$(extract_value "ApiStack" "ApiEndpoint")