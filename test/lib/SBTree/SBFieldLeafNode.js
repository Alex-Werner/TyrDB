const {expect} = require('chai');
const SBFieldLeafNode = require('../../../src/lib/SBTree/SBFieldLeafNode');
const ObjectId = require('../../../src/lib/ObjectId/ObjectId');

describe('Type - SBFieldLeafNode', () => {
  let leafNode;
  let objectId1 = new ObjectId(); let user1 = 'zachary'
  let objectId2 = new ObjectId(); let user2 = 'jean';
  let objectId3 = new ObjectId(); let user3 = 'alex';
  let objectId4 = new ObjectId(); let user4 = 'jules'

  it('should instantiate', function () {
    leafNode = new SBFieldLeafNode();

    expect(leafNode.keys).to.deep.equal([]);
    expect(leafNode.values).to.deep.equal([]);
  });
  it('should insert', function () {
    leafNode.insert(objectId1,user1);
    leafNode.insert(objectId2,user2);
    leafNode.insert(objectId3,user3);
    leafNode.insert(objectId4,user4);

    expect(leafNode.keys).to.deep.equal(['zachary', 'jean','alex','jules']);
    expect(leafNode.values).to.deep.equal([
        objectId1.toString(),
        objectId2.toString(),
        objectId3.toString(),
        objectId4.toString(),
    ]);
  });
  it('should get keys', function () {
    expect(leafNode.getKey(objectId1.toString())).to.equal(user1)
    expect(leafNode.getKey(objectId4.toString())).to.equal(user4)
  });
  it('should get value', function () {
    expect(leafNode.getValue(user2)).to.deep.equal(objectId2.toString())
    expect(leafNode.getValue(user3)).to.deep.equal(objectId3.toString())
  });
});
