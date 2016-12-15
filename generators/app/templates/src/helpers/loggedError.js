'use strict';

const httpStatus = require('http-status');
const logger = require('./logger');

/**
 * @extends Error
 */
class ExtendableError extends Error {
  /**
   * Creates a generic error.
   * @param {string} title - Error title.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message
   *                             should be visible to user or not.
   */
  constructor(title, message, status, isPublic)
  {
    super(message);
    this.name = this.constructor.name;
    this.title = title;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    // This is required since bluebird 4 doesn't append it anymore.
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an Logged error.
 * Errors are logged using winston
 *
 * @extends ExtendableError
 */
class LoggedError extends ExtendableError {
  /**
   * Creates an logged error.
   * @param {string} title - Error title.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message
   *                             should be visible to user or not.
   */
  constructor(title,
              message,
              status = httpStatus.INTERNAL_SERVER_ERROR,
              isPublic = false)
  {
    logger.error(message, {title, status, });
    super(title, message, status, isPublic);
  }
}

module.exports = LoggedError;
