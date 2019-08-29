const { expect } = require('chai');
const ObjectId = require('../../../src/lib/ObjectId/ObjectId');
describe('Type - ObjectId', () => {
  it('should generate a new value', function () {
    const oid = new ObjectId();
    expect(oid.isValid()).to.equal(true)
  });
  it('should work from value', function () {
    const hex = '507f191e810c19729de860ea';
    expect(new ObjectId(hex).isValid()).to.equal(true);
  });
});
