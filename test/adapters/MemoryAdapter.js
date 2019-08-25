const { expect } = require('chai');
const TyrDB = require('../../index');
const MemoryAdapter = require('../../src/adapters/MemoryAdapter/MemoryAdapter');

describe('MemoryAdapter', () => {

});
describe('MemoryAdapter - Within Tyr', ()=>{
  const adapter = new MemoryAdapter();

  it('should work', function (done) {
    const client = new TyrDB({adapter});
    client.on('ready', async ()=>{
      const dbName = 'test_db';

      await client.connect()
      expect(client.persistanceAdapter.store.databases).to.deep.equal({});

      const db = await client.db(dbName);
      expect(db.constructor.name).to.equal('Database');
      expect(db.name).to.equal(dbName)
      expect(db.collection).to.be.a('function');

      // Specific to this adapter
      expect(client.persistanceAdapter.store.databases[dbName].db).to.deep.equal(db);
      expect(client.persistanceAdapter.store.databases[dbName].collections).to.deep.equal({});

      // Specific to TyrDb
      expect(client.databases[dbName].db).to.deep.equal(db);
      expect(client.databases[dbName].collections).to.deep.equal({});


      const colName = 'users';
      const user = {name:"Obusco", age:28};
      const users = await db.collection(colName);


      expect(users.constructor.name).to.equal('Collection');
      expect(users.name).to.equal(colName)
      expect(users.insert).to.be.a('function');

      // Specific to this adapter
      expect(client.persistanceAdapter.store.databases[dbName].collections[colName].collection).to.deep.equal(users);

      // Specific to TyrDb
      expect(client.databases[dbName].collections[colName].collection).to.deep.equal(users);
      expect(client.databases[dbName].collections[colName].documents).to.deep.equal({});

      const inserted = await users.insert(user);

      expect(inserted.result.length).to.equal(1);
      const insertedUser = inserted.result[0]
      expect(insertedUser.name).to.equal(user.name)
      expect(insertedUser.age).to.equal(user.age)
      expect(insertedUser._id.constructor.name).to.be.equal('ObjectID');

      const hash = insertedUser._id;
      expect(client.persistanceAdapter.store.databases[dbName].collections[colName].documents[hash].name).to.equal(user.name)
      expect(client.persistanceAdapter.store.databases[dbName].collections[colName].documents[hash].age).to.equal(user.age)

      expect(client.databases[dbName].collections[colName].documents[hash]).to.deep.equal(['name','age']);


      // Find
      const findUser = await users.find({name:'Obusco'});
      expect(findUser).to.deep.equal(insertedUser);


      // Update easy way
      findUser.update({age:29});
      expect(findUser.age).to.equal(29)
      // Update MongoWay
      // users.updateOne({})


      // Replace
      const findUser2 = await users.find({age:29});
      findUser2.replace({name:'Obusco42'});

      expect(findUser2._id).to.deep.equal(findUser._id);
      expect(findUser2.name).to.deep.equal('Obusco42');
      expect(findUser2.age).to.not.exist

      client.close();
      done()
    })
  });
});
