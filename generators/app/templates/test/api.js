'use strict';

// Tests for api
// Generated by serverless-mocha-plugin

const mod = require('../src/handlers/api.js');
const mochaPlugin = require('serverless-mocha-plugin');

const lambdaWrapper = mochaPlugin.lambdaWrapper;
const expect = mochaPlugin.chai.expect;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'run', });

describe('api', () =>
{
  before((done) =>
  {
    // Run the deployed lambda
    lambdaWrapper.init(mod);
    done();
  });

  it('implement tests here', () => wrapped.run({}).then((response) =>
  {
    expect(response).to.not.be.empty;
  }));
});
