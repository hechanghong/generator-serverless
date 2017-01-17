'use strict';

const Joi = require('joi');
const Winston = require('winston');
const LoggedError = require('../helpers/loggederror');
const HTTPStatus = require('http-status');
const Settings = require('../../config/env.json');

const envVarsSchema = Joi.object({
  logger: Joi.object({
    level: Joi.string()
      .allow([
        'error',
        'warn',
        'info',
        'verbose',
        'debug',
        'silly'
      ])
      .default('info'),
    console_enabled: Joi.boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
      .default(true)
  })
}).unknown()
  .required();

const envVars = Joi.validate(Settings, envVarsSchema);

if (envVars.error) {
  throw new LoggedError(
    'Logger config validation error',
    envVars.error.message,
    HTTPStatus.INTERNAL_SERVER_ERROR,
    false
  );
}

const transports = [];

if (envVars.value.logger.console_enabled) {
  transports.push(new (Winston.transports.Console)({
    json: true,
    colorize: true,
  }));
}

const logger = new Winston.Logger({
  level: envVars.value.logger.level,
  transports,
});

module.exports = logger;
