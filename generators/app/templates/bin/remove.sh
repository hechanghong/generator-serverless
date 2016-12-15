#!/usr/bin/env bash

###
# Deploy script using the staging passed in first argument
##

source $(dirname $0)/function-lib.sh

DEFAULT_AWS_REGION=eu-west-1
DEFAULT_STAGE=dev

cd $(dirname $0)/../

# Remove Serverless project
callFunction "Remove Serverless project" "sls remove --region ${DEFAULT_AWS_REGION} --stage ${1:-$DEFAULT_STAGE}"

# EXIT
exit ${RETURN_CODE}
