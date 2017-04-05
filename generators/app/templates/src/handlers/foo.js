'use strict';

const Settings = require('../../config.json');
const logger = require('@exaprint/logger').setup(Settings);
const LambdaWrapper = require('../helpers/lambdawrapper');
const <%= classBaseName %>Service = require('../libs/<%= fileName %>/<%= fileName %>.service');


module.exports.run = (event, context, callback) => {
  // Logging example
  logger.info('Running API', { pid: process.pid });

  const app = new LambdaWrapper(callback);
  const service = new <%= classBaseName %>Service(true);

  // Each run is a chained promise
  app.run(() => service.setBar(Settings.logger.console_enabled))
     .run(() => service.getBar())
     .end();
};
