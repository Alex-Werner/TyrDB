import { expect } from 'chai';
import TyrDB from '../../index.js';
import dataset from '../fixtures/dataset.json' assert { type: "json" };
describe('E2E - More complete useCase', function suite() {
  let tyrdb = new TyrDB();
  let db;
  describe('Import dataset', async() => {
    it('should create a db', async function () {
      db = await tyrdb.db('myDatastore');
      expect(db.name).to.equal('myDatastore');
      expect(db.constructor.name).to.equal('Database');
    });
    describe('Import all dataset in multiples collections', async function (){
      let exchangesCollection;
      let usersCollection;
      describe('users collection', function (){
        it('should import data into collection', async function () {
          usersCollection = await db.collection('users');
          expect(usersCollection.name).to.equal('users');
          expect(usersCollection.constructor.name).to.equal('Collection');
          await usersCollection.insert(dataset.users);
        });
        it('should find it back', async function () {
          const [alexByName] = await usersCollection.find({name:'Alex Werner'});
          expect(alexByName.name).to.equal('Alex Werner')
          expect(alexByName.email).to.equal('alex.werner@nowhere.com')
          expect(alexByName.api_key.public).to.equal('pubkey1')
          const [alexByEmail] = await usersCollection.find({email:'alex.werner@nowhere.com'});
          expect(alexByEmail).to.deep.equal(alexByName);
          const [alexByapiKey] = await usersCollection.find({api_key:{public:'pubkey1'}});
          expect(alexByapiKey).to.deep.equal(alexByName);
          const [alexById] = await usersCollection.find({_id:alexByapiKey._id});
          expect(alexById).to.deep.equal(alexByName);

          const [alexByLteAge] = await usersCollection.find({age:{$lte:30}});
          expect(alexByLteAge).to.deep.equal(alexByName);
          const emptyResByLt = await usersCollection.find({age:{$lt:29}});
          expect(alexById).to.deep.equal(alexByName);
          expect(emptyResByLt).to.deep.equal([]);
          const [alexByGtAge] = await usersCollection.find({age:{$gt:2}});
          const [alexByGteAge] = await usersCollection.find({age:{$gte:29}});
          expect(alexByGteAge).to.deep.equal(alexByName);
          expect(alexByGtAge).to.deep.equal(alexByName);
        });
      })
      describe('exchanges collection', function (){
        it('should import data into collection', async function () {
          exchangesCollection = await db.collection('exchanges');
          expect(exchangesCollection.name).to.equal('exchanges');
          expect(exchangesCollection.constructor.name).to.equal('Collection');
          await exchangesCollection.insert(dataset.exchanges);
        });
        it('should find it back', async function () {
          const [binance] = await exchangesCollection.find({name:'Binance'});
          expect(binance.name).to.deep.equal( "Binance");
        });
      })
    });
  });

})
