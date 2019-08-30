const {expect} = require('chai');
const SBFieldTree = require('../../../src/lib/SBTree/SBFieldTree');
const ObjectId = require('../../../src/lib/ObjectId/ObjectId');
const faker = require('faker');
const {inspect} = require('util')
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
  it('should do the split correctly', ()=>{
    const maxNodeSize = 2;
    const users = [
      // {objectid:'5d675592aa2c1a52a0eeaa46', value:"Alexandre"},
      // {objectid:'5d6755b71f9edbc997c8d156', value:"Jean"},
      // {objectid:'5d6755bba792f16bdb3eab7b', value:"Jules"},
      // {objectid:'5d67592851b41056838b7232', value:"Julien"},
      // {objectid:'5d67599b94f1fcc963071138', value:"Alex"},
      // {objectid:'5d6759cd1d493a7fdcb0c43a', value:"Alain"},
      // {objectid:'5d6761b785c340115a93e87f', value:"Jacques"},
      // {objectid:'5d6762172cca333b9a04e4a7', value:"Zachary"},
      {objectid:'5d675592aa2c1a52a0eeaa46', value:"4"},//0
      {objectid:'5d6755b71f9edbc997c8d156', value:"6"},//1
      {objectid:'5d6755bba792f16bdb3eab7b', value:"7"},//2
      {objectid:'5d67592851b41056838b7232', value:"8"},//3

      {objectid:'5d67599b94f1fcc963071138', value:"3"},//4

      {objectid:'5d6759cd1d493a7fdcb0c43a', value:"0"},//5
      {objectid:'5d6761b785c340115a93e87f', value:"9"},//6
      {objectid:'5d6761b785c340115a9dd87f', value:"5"},
    ]
    fieldTree = new SBFieldTree({fieldName:'firstname', maxNodeSize});
    // console.log(new ObjectId().toString())
    fieldTree.insertValue(users[0].objectid, users[0].value);
    fieldTree.insertValue(users[1].objectid, users[1].value);
    fieldTree.insertValue(users[2].objectid, users[2].value);
    fieldTree.insertValue(users[3].objectid, users[3].value);
    // console.dir(fieldTree, {depth:null});
    fieldTree.insertValue(users[4].objectid, users[4].value);

    fieldTree.insertValue(users[5].objectid, users[5].value);
    // fieldTree.insertValue(users[6].objectid, users[6].value);
    // fieldTree.insertValue(users[5].objectid, users[5].value);
    console.log('')
    console.log('')
    console.log('--')
    console.dir(fieldTree, {depth:null});



    return;


    expect(fieldTree.size).to.equal(1);
    expect(fieldTree.keys).to.deep.equal([users[0].value]);
    expect(fieldTree.objectids).to.deep.equal([users[0].objectid]);


    // expect(fieldTree.leafNodes.length).to.equal(1);
    // expect(fieldTree.leafNodes[0].size).to.equal(1);
    // expect(fieldTree.leafNodes[0].maxNodeSize).to.equal(2);
    // expect(fieldTree.leafNodes[0].keys).to.deep.equal([users[0].value]);
    // expect(fieldTree.leafNodes[0].objectids).to.deep.equal([users[0].objectid]);

    fieldTree.insertValue(users[1].objectid, users[1].value);
    expect(fieldTree.size).to.equal(2);
    expect(fieldTree.keys).to.deep.equal([]);
    expect(fieldTree.leafNodes.length).to.equal(1);
    expect(fieldTree.leafNodes[0].size).to.equal(2);
    expect(fieldTree.leafNodes[0].maxNodeSize).to.equal(2);
    expect(fieldTree.leafNodes[0].keys).to.deep.equal([users[0].value, users[1].value]);
    expect(fieldTree.leafNodes[0].objectids).to.deep.equal([users[0].objectid, users[1].objectid]);

    fieldTree.insertValue(users[2].objectid, users[2].value);
    expect(fieldTree.size).to.equal(3);
    expect(fieldTree.keys).to.deep.equal([users[1].value]);
    expect(fieldTree.objectids).to.deep.equal([users[1].objectid]);
    expect(fieldTree.leafNodes.length).to.equal(2);
    expect(fieldTree.leafNodes[0].size).to.equal(1);
    expect(fieldTree.leafNodes[0].maxNodeSize).to.equal(2);
    expect(fieldTree.leafNodes[0].keys).to.deep.equal([users[0].value]);
    expect(fieldTree.leafNodes[0].objectids).to.deep.equal([users[0].objectid]);

    expect(fieldTree.leafNodes[1].size).to.equal(1);
    expect(fieldTree.leafNodes[1].maxNodeSize).to.equal(2);
    expect(fieldTree.leafNodes[1].keys).to.deep.equal([users[2].value]);
    expect(fieldTree.leafNodes[1].objectids).to.deep.equal([users[2].objectid]);


    fieldTree.insertValue(users[3].objectid, users[3].value);

    expect(fieldTree.size).to.equal(4);
    expect(fieldTree.keys).to.deep.equal([users[1].value]);
    expect(fieldTree.objectids).to.deep.equal([users[1].objectid]);
    expect(fieldTree.leafNodes.length).to.equal(2);
    expect(fieldTree.leafNodes[0].size).to.equal(1);
    expect(fieldTree.leafNodes[0].maxNodeSize).to.equal(2);
    expect(fieldTree.leafNodes[0].keys).to.deep.equal([users[0].value]);
    expect(fieldTree.leafNodes[0].objectids).to.deep.equal([users[0].objectid]);

    expect(fieldTree.leafNodes[1].size).to.equal(2);
    expect(fieldTree.leafNodes[1].maxNodeSize).to.equal(2);
    expect(fieldTree.leafNodes[1].keys).to.deep.equal([users[2].value, users[3].value]);
    expect(fieldTree.leafNodes[1].objectids).to.deep.equal([users[2].objectid, users[3].objectid]);

    fieldTree.insertValue(users[4].objectid, users[4].value);
    fieldTree.insertValue(users[5].objectid, users[5].value);
    fieldTree.insertValue(users[6].objectid, users[6].value);
    fieldTree.insertValue(users[7].objectid, users[7].value);
    console.log(fieldTree.leafNodes)
  })
  // it('should instantiate', function () {
  //   fieldTree = new SBFieldTree({fieldName:'firstname'});
  //   expect(fieldTree.fieldName).to.deep.equal('firstname');
  //   // expect(fieldTree.root.constructor.name).to.deep.equal('SBFieldRootNode');
  //   expect(fieldTree.leafNodes[0].constructor.name).to.deep.equal('SBFieldLeafNode');
  //   expect(fieldTree.size).to.equal(0);
  // });
  // it('should insert a value', function () {
  //   const batch1 = fakeData.slice(0, 2);
  //
  //   batch1.forEach((data)=>{
  //     const id = data[0]
  //     const value = data[1];
  //     fieldTree.insertValue(id, value);
  //   })
  //   expect(fieldTree.size).to.equal(2);
  // });
  // it('should find a value', function () {
  //   const valueFromObjectId = fieldTree.getValueFromObjectId(fakeData[0][0]);
  //   expect(valueFromObjectId).to.equal(fakeData[0][1])
  //
  //   const objectIdsFromValues = fieldTree.findObjectIds(fakeData[0][1]);
  //   expect(objectIdsFromValues).to.deep.equal([fakeData[0][0],fakeData[1][0]])
  //
  // });
  // it('should be able to shard', function () {
  //   const batch2 = fakeData.slice(2, 33);
  //   batch2.forEach((data)=>{
  //     const id = data[0]
  //     const value = data[1];
  //     fieldTree.insertValue(id, value);
  //   })
  //   expect(fieldTree.size).to.equal(33);
  //   console.log({fieldTree});
  // });

});
