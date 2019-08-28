const {expect} = require('chai');
const SBRootNode = require('../../../src/lib/SBTree/SBRootNode');

describe('Type - SBRootNode', () => {
  let rootNode;
  it('should instantiate', function () {
    rootNode = new SBRootNode();
    expect(rootNode).to.deep.equal({fields: [], fieldNodesReference: []})
  });
  it('should add a new field', function () {
    rootNode.insert('name');
    expect(rootNode.fields).to.deep.equal(['name']);
  })
  it('should get a ')
});
