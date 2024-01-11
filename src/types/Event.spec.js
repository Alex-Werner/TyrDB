// const { expect } = require('chai');
// const EventSpec = require('./Event');
import { expect } from 'chai';
import EventSpec from './Event.js';
describe('Type - Event', () => {
  it('should work', function () {
    const event = new EventSpec('started');
    expect(event.name).to.equal('started');
    expect(event.payload).to.deep.equal({});

    const event2 = new EventSpec({name:'started', payload:{isStarted:true}})
    expect(event2.name).to.equal('started');
    expect(event2.payload).to.deep.equal({isStarted:true});
  });
});
