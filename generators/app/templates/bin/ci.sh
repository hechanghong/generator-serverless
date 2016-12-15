#!/usr/bin/env bash

source $(dirname $0)/function-lib.sh

# Start Unit test & code coverage
callFunction "Mocha Unit test & code coverage" "jenkins-mocha --timeout 30000 --colors --recursive --cobertura"

# Eslint
mkdir -p artifacts/eslint
callFunction "EsLint checkstyle" "eslint -f checkstyle src test > artifacts/eslint/eslint.xml" 1

# SDependencies Security Check using NSP
callFunction "Dependencies Security Check using NSP" "npm run -s security" 1

# Plato Analysis
mkdir -p artifacts/plato
callFunction "Plato Analysis" "plato -r -t '<%= projectName %>' -d artifacts/plato src" 1

# JsDoc Generation
mkdir -p artifacts/jsdoc
callFunction "JsDoc Generation" "jsdoc -d artifacts/jsdoc -c ./jsdoc.conf.json -t ./node_modules/ink-docstrap/template -P ./package.json -R ./README.md -r src" 1

# EXIT
exit ${RETURN_CODE}