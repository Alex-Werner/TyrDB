const { expect } = require('chai');
const TyrDB = require('../../index');
const FsAdapter = require('../../src/adapters/FsAdapter/FsAdapter');
const Directory = require('../../src/adapters/FsAdapter/Directory/Directory');
// describe('FsAdapter', () => {
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
describe('FsAdapter - Within Tyr', ()=>{
  const adapter = new FsAdapter();
//
  it('should work', function (done) {
    const path = `.db/test_${+new Date()}/FsAdapter`;
    // const path = `.db/test_/FsAdapter`;
    const tyr = new TyrDB({path, adapter});
    tyr.on('connected', async ()=>{
      expect(tyr.$meta.isConnected).to.equal(true);

      const db = await tyr.db('test')
      console.log(db)
      done();
    })
  });
});
