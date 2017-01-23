'use strict';

const debug = require('debug')('API');
const logger = require('../helpers/logger');
const LambdaWrapper = require('../helpers/lambdawrapper');
const <%= classBaseName %>Service = require('../libs/<%= routeName %>/<%= routeName %>.service');
const Settings = require('../../config/env.json');

// Debug app example
debug('Starting API');

module.exports.run = (event, context, callback) => {
  // Logging example
  logger.info('Running API', { pid: process.pid });

  const app = new LambdaWrapper(callback);
  const service = new <%= classBaseName %>Service(true);

  // Each run is a chained promise
  app.run(() => service.setBar(Settings.<%= routeName %>.bar_value))
     .run(() => service.getBar())
     .end();
};
