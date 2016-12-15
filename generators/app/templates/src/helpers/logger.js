'use strict';

const joi = require('joi');
const winston = require('winston');

const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
                     .allow([
                       'error',
                       'warn',
                       'info',
                       'verbose',
                       'debug',
                       'silly',
                     ])
                     .default('info'),
  LOGGER_CONSOLE_ENABLED: joi .boolean()
                              .truthy('TRUE')
                              .truthy('true')
                              .falsy('FALSE')
                              .falsy('false')
                              .default(true),
}).unknown()
  .required();

const envVars = joi.validate(process.env, envVarsSchema);

if (envVars.error)
{
  throw new Error(`Config validation error: ${envVars.error.message}`);
}

const transports = [];

if (envVars.value.LOGGER_CONSOLE_ENABLED)
{
  transports.push(new (winston.transports.Console)({
    json: true,
    colorize: true,
  }));
}

const logger = new winston.Logger({
  level: envVars.value.LOGGER_LEVEL,
  transports,
});

module.exports = logger;
