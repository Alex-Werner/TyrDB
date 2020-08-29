const {expect} = require('chai');
const TyrDB = require('../../index');
const assets = require('../fixtures/assets.json');

describe('E2E - Classic UseCase', function suite() {
  describe('Asset DB', async() => {
    const shiftedUsers = [];
    const tyrDb = new TyrDB();
    let generalDb;
    let assetsCollection;
    it('should connect', async function () {
      await tyrDb.connect();
    });
    it('should create a database', async function () {
      generalDb = await tyrDb.db('general');
      expect(generalDb.name).to.equal('general');
      expect(generalDb.constructor.name).to.equal('Database');
    });
    it('should create a collection', async function () {
      assetsCollection = await generalDb.collection('assets');
      expect(assetsCollection.name).to.equal('assets');
      expect(assetsCollection.constructor.name).to.equal('Collection');
    });
    it('should insert documents', async function () {
      const insertionResults = await assetsCollection.insertMany(assets);
      expect(insertionResults).to.deep.equal({results:assets})
    });
    it('should find documents', async function () {
      const findResults = await assetsCollection.find({name: "Bitcoin"});
      expect(findResults).to.deep.equal([assets[0]])
      const findResults2 = await assetsCollection.find({metrics: {totalUnit:{$lte:20000}}});
      console.log({findResults2});

    });
  });

})
