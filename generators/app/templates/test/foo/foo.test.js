'use strict';

const expect = require('chai').expect;
const <%= classBaseName %>Service = require('../../src/libs/<%= routeName %>/<%= routeName %>.service');

describe('Test', function() {
  it('Should be completely tested', function() {
    const service = new <%= classBaseName %>Service(true);

    expect(service.getBar()).to.be.true;
  });
});

