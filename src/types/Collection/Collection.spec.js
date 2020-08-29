const { expect } = require('chai');

const CollectionSpec = require('./Collection');
const {MemoryAdapter} = require('../../../adapters')
describe('Type - Collection', () => {
  it('should work', function () {
    const fakeTyrInstance = {
      persistanceAdapter: new MemoryAdapter()
    };
    const col = new CollectionSpec({name:'users', tyrInstance:fakeTyrInstance})
    expect(col.name).to.be.deep.equal("users")
    const colUnique = new CollectionSpec({name:'users', tyrInstance:fakeTyrInstance,uniques:['email']})
    expect(colUnique.name).to.be.deep.equal("users")
    expect(colUnique.getTree().uniques).to.be.deep.equal(['email'])

    const colExclude = new CollectionSpec({name:'users', tyrInstance:fakeTyrInstance,exclude:['email']})
    expect(colExclude.name).to.be.deep.equal("users")
    expect(colExclude.getTree().exclude).to.be.deep.equal(['email'])

    const colOrder = new CollectionSpec({name:'users', tyrInstance:fakeTyrInstance,order:25})
    expect(colOrder.getTree().order).to.be.deep.equal(25)
  });
});
