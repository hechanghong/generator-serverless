'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const <%= classBaseName %>Service = require('../../src/libs/<%= fileName %>/<%= fileName %>.service');

chai.use(chaiAsPromised);

describe('Test', function() {
  it('Should be completely tested', function() {
    const service = new <%= classBaseName %>Service(true);

    expect(service.getBar()).to.be.true;
  });
});

