#!/usr/bin/env bash

# Define some colors to use for output
RED='\033[0;31m'
GREEN='\033[0;32m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Define return and error codes
RETURN_CODE=0

# Number of retry
RETRY_LOOP=3

##
# Call a continuous integration function passed by parameter (2)
# Check the return code and set global return code with 1 or 0
#
# @param $1 Name of the process
# @param $2 Function string to execute
# @param $3 If option === 0 : Non-Blocking failure
#           If option > 1 : Non-Blocking failure and retry in ${option} second, max ${RETRY_LOOP} times
#           If option <= 0 : Blocking failure
##
callFunction() {
    name=$1
    cmd=$2
    option=${3:-0}
    retried=${4:-$RETRY_LOOP}

    echo "Starting ${name}."
    echo "  $ ${cmd}"
    eval ${cmd}
    if [ $? -ne 0 ] ; then
        # If option === 1 : Non-Blocking failure
        if [ ${option} == 1 ] ; then
            printf "${MAGENTA}${name} Failed!${NC}\n"
        # If option > 1 : Non-Blocking failure and retry in ${option} second, max ${RETRY_LOOP} times
        elif [ ${option} -gt 1 ] && [ ${retried} -gt 0 ] ; then
            printf "${MAGENTA}${name} Failed!${NC}\n"
            printf "${MAGENTA}Sleeping for ${option}s to retry (${retried} time remaining)!${NC}\n"
            sleep ${option}
            retried=$(( ${retried} - 1 ))
            callFunction "${name}" "${cmd}" ${option} ${retried}
        # If option <= 0 : Blocking failure
        else
            printf "${RED}${name} Failed!${NC}\n"
            RETURN_CODE=1
        fi
    else
        printf "${GREEN}${name} end!${NC}\n"
    fi
}
