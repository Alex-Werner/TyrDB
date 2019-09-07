const { expect } = require('chai');

const Collection = require('../../../src/types/Collection/Collection');
const {MemoryAdapter} = require('../../../adapters')
describe('Type - Collection', () => {
  it('should work', function () {
    const fakeTyrInstance = {
      persistanceAdapter: new MemoryAdapter()
    };
    const col = new Collection({name:'users', tyrInstance:fakeTyrInstance})
    expect(col.name).to.be.deep.equal("users")
    const colUnique = new Collection({name:'users', tyrInstance:fakeTyrInstance,uniques:['email']})
    expect(colUnique.name).to.be.deep.equal("users")
    expect(colUnique.getTree().uniques).to.be.deep.equal(['email'])

    const colExclude = new Collection({name:'users', tyrInstance:fakeTyrInstance,exclude:['email']})
    expect(colExclude.name).to.be.deep.equal("users")
    expect(colExclude.getTree().exclude).to.be.deep.equal(['email'])

    const colOrder = new Collection({name:'users', tyrInstance:fakeTyrInstance,order:25})
    expect(colOrder.getTree().options.order).to.be.deep.equal(25)
  });
});
