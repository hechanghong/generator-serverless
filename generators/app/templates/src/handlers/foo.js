'use strict';

const Settings = require('../../config.json');
const logger = require('@exaprint/logger').setup(Settings.logger);
const LambdaWrapper = require('../helpers/lambdawrapper');
const <%= classBaseName %>Service = require('../libs/<%= fileName %>/<%= fileName %>.service');

module.exports.run = (event, context, callback) => {
  // Logging example
  logger.info('Running API', { pid: process.pid });

  const app = new LambdaWrapper(callback);
  const service = new <%= classBaseName %>Service({});

  // Each run is a chained promise
  app.run(() => service.setBar({foo: 'baz'}))
     .run(serviceObj => serviceObj.getBar())
     .end();
};
