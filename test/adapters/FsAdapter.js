const { expect } = require('chai');
const TyrDB = require('../../index');
const MemoryAdapter = require('../../src/adapters/MemoryAdapter/MemoryAdapter');

describe('FsAdapter', () => {

});
describe('FsAdapter - Within Tyr', ()=>{
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

      done()

    })
  });
});
