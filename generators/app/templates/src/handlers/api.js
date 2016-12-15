'use strict';

// Load Common helpers
const logger = require('../helpers/logger');
const HTTPStatus = require('http-status');
const debug = require('debug')('API');

// Debug app example
debug('Starting API');

module.exports.run = (event, context, callback) =>
{
  // Logging example
  logger.info('Running API', { pid: process.pid, });

  // Create a response
  const result = {
    message: 'OK',
  };

  const response = {
    statusCode: HTTPStatus.OK,
    body: JSON.stringify(result), // Always stringify Objects inside the 'body'
  };

  callback(null, response);
};
