const { expect } = require('chai');
const SBTree = require('../../../src/lib/SBTree/SBTree');
const SBRootNode = require('../../../src/lib/SBTree/SBRootNode');
const Document = require('../../../src/types/Document/Document');
describe('Type - SBTree', () => {
  let tree;
  it('should instantiate', function () {
    tree = new SBTree();
    expect(tree.size).to.equal(0)
    expect(tree.maxNodeSize).to.equal(32)
    expect(tree.root).to.deep.equal(new SBRootNode())
    expect(tree.fieldNode).to.deep.equal([])
  });
  it('should add a document', function () {
    const document = new Document({name:"Alex", age:27,sector: 'it'});
    tree.insertDocument(document);
    expect(tree.size).to.equal(1);
    // console.log(tree.root)
  })
  it('should find a document', function () {
    const document = tree.findDocument({name:'Alex', age:27});
    console.log(document);
  })
});
