const { expect } = require('chai');
const TyrDB = require('../../index');
const FsAdapter = require('../../src/adapters/FsAdapter/FsAdapter');
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

  it('should work', function (done) {
    // const path = `.db/test_${+new Date()}/FsAdapter`;
    const path = `.db/test_1/FsAdapter`;
    const client = new TyrDB({path, adapter});

    client.on('ready', async ()=>{
      done();
    });
  });
});
