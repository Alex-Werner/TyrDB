const { expect } = require('chai');
const Event = require('../../src/types/Event');
describe('Type - Event', () => {
  it('should work', function () {
    const event = new Event('started');
    expect(event.name).to.equal('started');
    expect(event.payload).to.deep.equal({});

    const event2 = new Event({name:'started', payload:{isStarted:true}})
    expect(event2.name).to.equal('started');
    expect(event2.payload).to.deep.equal({isStarted:true});
  });
});
