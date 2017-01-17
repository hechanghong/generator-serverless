'use strict';

class <%= classBaseName %>Service {
  /**
   * Constructor
   *
   * @param {bool} bar Bar object
   */
  constructor(bar) {
    this.bar = bar;
  }

  /**
   * Set Bar
   *
   * @param {bool} bar Bar object
   *
   * @returns {<%= classBaseName %>Service} this
   */
  setBar(bar) {
    this.bar = bar;

    return this;
  }

  /**
   * Get Bar
   *
   * @returns {bool} Bar value
   */
  getBar() {
    return this.bar;
  }
}

module.exports = <%= classBaseName %>Service;
