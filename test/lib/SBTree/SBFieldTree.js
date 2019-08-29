const {expect} = require('chai');
const SBFieldTree = require('../../../src/lib/SBTree/SBFieldTree');
const ObjectId = require('../../../src/lib/ObjectId/ObjectId');
const faker = require('faker');
describe('Type - SBFieldTree', () => {
  let fieldTree;
  const duplicate = faker.fake('{{name.firstName}}');

  const fakeData = [
    [new ObjectId().toString(), duplicate],
    [new ObjectId().toString(), duplicate]
  ];
  while (fakeData.length<65){
    fakeData.push([new ObjectId().toString(), faker.fake('{{name.firstName}}')])
  }

  it('should instantiate', function () {
    fieldTree = new SBFieldTree({fieldName:'firstname'});
    expect(fieldTree.fieldName).to.deep.equal('firstname');
    // expect(fieldTree.root.constructor.name).to.deep.equal('SBFieldRootNode');
    expect(fieldTree.leafNodes[0].constructor.name).to.deep.equal('SBFieldLeafNode');
    expect(fieldTree.size).to.equal(0);
  });
  it('should insert a value', function () {
    const batch1 = fakeData.slice(0, 2);

    batch1.forEach((data)=>{
      const id = data[0]
      const value = data[1];
      fieldTree.insertValue(id, value);
    })
    expect(fieldTree.size).to.equal(2);
  });
  it('should find a value', function () {
    const valueFromObjectId = fieldTree.getValueFromObjectId(fakeData[0][0]);
    expect(valueFromObjectId).to.equal(fakeData[0][1])

    const objectIdsFromValues = fieldTree.findObjectIds(fakeData[0][1]);
    expect(objectIdsFromValues).to.deep.equal([fakeData[0][0],fakeData[1][0]])

  });
  it('should be able to shard', function () {
    const batch2 = fakeData.slice(2, 33);
    batch2.forEach((data)=>{
      const id = data[0]
      const value = data[1];
      fieldTree.insertValue(id, value);
    })
    expect(fieldTree.size).to.equal(33);
    console.log({fieldTree});
  });

});
