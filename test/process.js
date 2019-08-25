const { expect } = require('chai');
const TyrDB = require('../index');
let instance;
let testProcessDb;
let userCollection;
let userDocument;
describe('TyrDB - process', () => {
  it('should create instance', () => {
    instance = new TyrDB();
    expect(instance.path).to.equal('.db');
    expect(instance.databases).to.deep.equal([]);
    console.log('Instance', instance)
  });
  it('should create a db when not exist',async function () {
    testProcessDb = await instance.db('testProcessDb');
    expect(testProcessDb.name).to.equal('testProcessDb');
    expect(instance.databases).to.deep.equal([{
      name: "testProcessDb"
    }]);
    console.log(`Db ${JSON.stringify(testProcessDb)}`);
  });
  it('should create a users collections', async function  () {
    userCollection = await testProcessDb.collection('users')
    expect(userCollection.name).to.equal('users');
    console.log('Created collection', userCollection)
  });
  it('should insert a user', async function () {
    userDocument = await userCollection.insert({username:'Obusco', firstname:'Alex', lastname:'Werner'});
    console.log('Inserted User', userDocument);
    console.log(userCollection)
    console.log(testProcessDb)
    console.log(instance)
  })
  // it('should find a user', function () {
  //   userCollection.find({username:'Obusco'});
  // });
  // it('should (not yet) insert many users', async function () {
  //   const docs = await instance.createCollection('docs');
  //   expect(()=>{
  //     docs.insert([{key:1},{key:2}])
  //   }).to.throw('Not implemented feature : insert from array')
  // })
  //
  // it('should fetch a db when exist', function () {
  //   const db = instance.db('testProcessDb');
  //   console.log(db);
  // });
});
