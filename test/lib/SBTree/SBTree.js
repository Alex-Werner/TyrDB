const {expect} = require('chai');
const SBTree = require('../../../src/lib/SBTree/SBTree');
const Document = require('../../../src/types/Document/Document');

const documentData = new Document({age:28, email:'jean@valjean.fr'});
const documentData2 = {age:29, email:'basil@valjean.fr'};
const documentData3 = {age:39, email:'jules@valjean.fr'};
const documentData4 = {age:29, email:'alex@valjean.fr'};

describe('Type - SBTree', () => {
  let tree;
  it('should instantiate', function () {
    tree = new SBTree();
    expect(tree.size).to.equal(0);
    expect(tree.maxNodeSize).to.equal(32);
    expect(tree.fieldNode).to.deep.equal([]);
    expect(tree.root.constructor.name).to.equal('SBRootNode');
  });
  it('should insert a document', function () {
    tree.insertDocuments(documentData);
    console.log(tree)
    expect(tree.size).to.equal(1);
    tree.insertDocuments(documentData2);
    tree.insertDocuments(documentData3);
    tree.insertDocuments(documentData4);
    expect(tree.size).to.equal(4);
    expect(Object.keys(tree.root.fieldTrees)).to.deep.equal(['age', 'email'])
    expect(tree.root.fieldTrees.age.constructor.name).to.deep.equal('SBFieldTree')
  });
  it('should get a document', function () {
    const document = tree.getDocument(documentData._id);
    console.log(document)
    expect(document).to.deep.equal(documentData.data)
  });
  it('should find a document', function () {
    const documents = tree.findDocuments({age:28});
    // expect(documents).to.deep.equal([documentData])
    const documents2 = tree.findDocuments({age:29});
    // expect(documents).to.deep.equal([documentData4, documentData2])
  });
});
