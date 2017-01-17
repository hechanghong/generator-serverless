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
  constructor(title, message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.title = title;
    this.message = message;
    if (!status) {
      this.status = httpStatus.INTERNAL_SERVER_ERROR;
    } else {
      this.status = status;
    }
    if (typeof isPublic !== 'boolean') {
      this.isPublic = true;
    } else {
      this.isPublic = isPublic;
    }
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
  constructor(title, message, status, isPublic) {
    logger.error(message, {title, status, });
    super(title, message, status, isPublic);
  }
}

module.exports = LoggedError;
