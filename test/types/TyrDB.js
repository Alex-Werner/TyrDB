const { expect } = require('chai');
const TyrDB = require('../../index');
const MemoryAdapter = require('../../src/adapters/MemoryAdapter/MemoryAdapter');
const Event = require('../../src/types/Event')
describe('TyrDB - Class', () => {
  let tyr;
  it('should work', function () {
    tyr = new TyrDB();
    expect(tyr.persistanceAdapter).to.deep.equal(new MemoryAdapter())
    expect(tyr.databases).to.deep.equal([])
  });
  it('should be able to listen', function (done) {
    const tyr2 = new TyrDB();
    tyr2.on('ready', ()=>{
      done()
    });
  })
  it('should be able to emit normal event', function (done) {
    const tyr2 = new TyrDB();
    tyr2.on('eventName', (event)=>{
      expect(event).to.deep.equal({isSelected:true});
      done()
    });
    tyr2.emit('eventName', {isSelected:true});
  });
  it('should be able to emit event', function (done) {
    const tyr2 = new TyrDB();
    tyr2.on('eventName', (event)=>{
      expect(event).to.deep.equal({isSelected:true});
      done()
    });
    tyr2.emit(new Event({name:'eventName', payload:{isSelected:true}}));
  });
});
