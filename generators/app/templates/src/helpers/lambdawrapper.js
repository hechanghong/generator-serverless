'use strict';

const Promise = require('bluebird');
const HTTPStatus = require('http-status');

/**
 * Simple Lambda Wrapper
 * It provide an abstraction over the lambda callback and Promises runtimes
 */
class LambdaWrapper {
  /**
   * Constructor
   * @param {Function} finalCallback AWS Lambda callback function
   */
  constructor(finalCallback) {
    this.finalCallback = finalCallback;
    this.error = false;
    this.publicResponse = true;
    this.statusCode = HTTPStatus.OK;
    this.body = {
      success: true,
    };
    this.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    this.p = null;
  }

  /**
   * Run a function wrapped into a Promise
   *
   * @param {Function} func Function to call over a Promise
   *
   * @returns {LambdaWrapper} This instance
   */
  run(func) {
    if (this.p === null) {
      this.p = LambdaWrapper.promisify(func);
    } else {
      this.p = this.p.then(data => LambdaWrapper.promisify(func, data));
    }

    return this;
  }

  /**
   * Build and return an AWS Lambda formated response
   *
   * @returns {Object} AWS Lambda formated response
   */
  getResponse() {
    return {
      headers: this.headers,
      statusCode: this.statusCode,
      // Always stringify Objects inside the 'body'
      body: JSON.stringify(this.body),
    };
  }

  /**
   * Terminate the Lambda process by calling it callback
   * Add the error handler to promise chaining process
   *
   * @return {null} Void
   */
  end() {
    this.p.catch((error) => {
      this.error = true;
      this.statusCode = error.status;
      this.body.success = false;
      if (error.isPublic) {
        this.body.error = error.title;
        this.body.error_message = error.message;
      } else {
        this.body.error = 'Internal server error';
      }
    }).finally(() => {
      this.finalCallback(null, this.getResponse());
    });
  }

  /**
   * Execute a function inside a promise
   *
   * @param {Function} func Function to call over a Promise
   * @param {Object | String} data Datas to pass through the function
   *
   * @return {Promise} Return the Promise itself
   */
  static promisify(func, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(func(data));
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = LambdaWrapper;
