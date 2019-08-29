const {expect} = require('chai');
const SBRootNode = require('../../../src/lib/SBTree/SBRootNode');
const Document = require('../../../src/types/Document/Document');

describe('Type - SBRootNode', () => {
  let rootNode;
  let document =  new Document({email:"jean@valjean.fr",name:'Jean'})
  let document2 = new Document({email:'jacques@valjean.fr', name:"Jacques", age :29});
  it('should instantiate', function () {
    rootNode = new SBRootNode();
    expect(rootNode).to.deep.equal({fieldTrees: {}})
  });
  it('should add a new document', function () {
    rootNode.insert(document);
    expect(rootNode.fieldTrees['name'].size).to.deep.equal(1);
    expect(rootNode.fieldTrees['email'].size).to.deep.equal(1);
    rootNode.insert(document2)
    expect(rootNode.fieldTrees['age'].size).to.deep.equal(1);
    expect(rootNode.fieldTrees['name'].size).to.deep.equal(2);
    expect(rootNode.fieldTrees['email'].size).to.deep.equal(2);
  })
  it('should get a document', function () {
    const doc =rootNode.get(document._id);
    expect(doc).to.deep.equal(document.data);
  });
  // it('should query a document', function () {
  //   const doc =rootNode.query(document.data);
  //   expect(doc).to.deep.equal([document.data]);
  // });
});
