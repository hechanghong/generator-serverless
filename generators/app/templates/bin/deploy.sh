#!/usr/bin/env bash

###
# Deploy script using the staging passed in first argument
##

source $(dirname $0)/function-lib.sh

DEFAULT_AWS_REGION=eu-west-1
DEFAULT_STAGE=dev

cd $(dirname $0)/../

# Remove devDependencies
callFunction "Remove devDependencies" "npm prune --production"
# Install production dependencies
callFunction "Install production dependencies" "npm install --production"
# Deploy Serverless project
callFunction "Deploy Serverless project" "sls deploy --region ${DEFAULT_AWS_REGION} --stage ${1:-$DEFAULT_STAGE}"

# EXIT
exit ${RETURN_CODE}