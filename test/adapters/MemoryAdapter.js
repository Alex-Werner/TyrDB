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

      expect(client.persistanceAdapter.store.databases).to.deep.equal({});

      const db = await client.db(dbName);
      console.log(db);
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
      const userPayload = {name:"Obusco", age:28};
      const users = await db.collection(colName, {indices:['name']});


      expect(users.constructor.name).to.equal('Collection');
      expect(users.name).to.equal(colName)
      expect(users.insert).to.be.a('function');

      // Specific to this adapter
      expect(client.persistanceAdapter.store.databases[dbName].collections[colName].collection).to.deep.equal(users);

      // Specific to TyrDb
      expect(client.databases[dbName].collections[colName].collection).to.deep.equal(users);
      expect(client.databases[dbName].collections[colName].collection.documents).to.deep.equal([]);

      const inserted = await users.insert(userPayload);

      expect(inserted.result.length).to.equal(1);
      const user = inserted.result[0]

      expect(user.name).to.equal(userPayload.name)
      expect(user.age).to.equal(userPayload.age)
      expect(user._id.constructor.name).to.be.equal('ObjectID');

      const hash = user._id;
      expect(client.persistanceAdapter.store.databases[dbName].collections[colName].documents[hash].name).to.equal(userPayload.name)
      expect(client.persistanceAdapter.store.databases[dbName].collections[colName].documents[hash].age).to.equal(userPayload.age)

      console.log(JSON.stringify(client.databases[dbName].collections[colName].collection.documents[hash]))
      expect(client.databases[dbName].collections[colName].collection.documents[hash]).to.deep.equal(user.export());


      // Find
      const findUser = await users.find({name:'Obusco'});
      expect(findUser).to.deep.equal(user);


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
