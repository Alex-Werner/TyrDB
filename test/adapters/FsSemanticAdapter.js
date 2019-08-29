const { expect } = require('chai');
const TyrDB = require('../../index');
const FsSemanticAdapter = require('../../src/adapters/FsSemanticAdapter/FsSemanticAdapter');
const Directory = require('../../src/adapters/FsAdapter/Directory/Directory')
const File = require('../../src/adapters/FsAdapter/File/File')
// describe('FsSemanticAdapter', () => {
//
//   it('should create missing folder on create', async function () {
//     const path = `.db/test_${+new Date()}/FsAdapter`;
//     expect(await Directory.exists(path)).to.equal(false)
//     const adapter = new FsAdapter();
//     await adapter.connectDatabase(path)
//     expect(await Directory.exists(path)).to.equal(true)
//     console.log(adapter)
//   });
// });
describe('FsSemanticAdapter - Within Tyr', ()=>{
  const adapter = new FsSemanticAdapter();
  it('should work', function (done) {
    // const path = `.db/test_${+new Date()}/FsAdapter`;
    const path = `.db/test_1/FsAdapter`;
    const client = new TyrDB({path, adapter});
    client.on('ready', async ()=>{
      console.log('ready')
      const dbName = 'test_db';
      expect(await Directory.exists(path)).to.equal(true);

      const db = await client.db(dbName);
      expect(db.constructor.name).to.equal('Database');
      expect(db.name).to.equal(dbName)
      expect(db.collection).to.be.a('function');

      // Specific to this adapter
      expect(await Directory.exists(path+'/'+dbName)).to.equal(true);
      expect(await File.exists(path+'/'+dbName+'/meta.json')).to.equal(true);
      expect(await File.read(path+'/'+dbName+'/meta.json')).to.deep.equal({name:dbName});

      // Specific to TyrDb
      expect(client.databases[dbName].db).to.deep.equal(db);
      expect(client.databases[dbName].collections).to.deep.equal({});

      const colName = 'users';
      const user = {name:"Obusco", age:28};
      const users = await db.collection(colName, {indices:['age']});
      expect(users.constructor.name).to.equal('Collection');
      expect(users.name).to.equal(colName)
      expect(users.insert).to.be.a('function');

      // Specific to this adapter
      expect(await Directory.exists(`${path}/${dbName}/${colName}`)).to.equal(true);
      expect(await File.exists(`${path}/${dbName}/${colName}/meta.json`)).to.equal(true);
      expect(await File.read(`${path}/${dbName}/${colName}/meta.json`)).to.deep.equal({name:colName, parentDatabaseName:dbName});

      // Specific to TyrDb
      expect(client.databases[dbName].collections[colName].collection).to.deep.equal(users);
      expect(client.databases[dbName].collections[colName].collection.documents).to.deep.equal([]);

      const inserted = await users.insert(user);

      expect(inserted.result.length).to.equal(1);
      const insertedUser = inserted.result[0]
      expect(insertedUser.data.name).to.equal(user.name)
      expect(insertedUser.data.age).to.equal(user.age)
      expect(insertedUser._id.constructor.name).to.be.equal('ObjectId');

      const id = insertedUser._id.toString();
      expect(await File.exists(`${path}/${dbName}/${colName}/${insertedUser._id}.json`)).to.equal(true);
      const fileRead = await File.read(`${path}/${dbName}/${colName}/${insertedUser._id}.json`);
      expect(fileRead.data.name).to.equal(user.name)
      expect(fileRead.data.age).to.equal(user.age)

      expect(client.databases[dbName].collections[colName].collection.documents[id]._fields).to.deep.equal(['name','age']);


      // Find
      const findUser = await users.find({name:'Obusco'});
      expect(findUser).to.deep.equal(insertedUser);


      done();
    });
  });
});
