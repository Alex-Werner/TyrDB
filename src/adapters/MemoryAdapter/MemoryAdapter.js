const PersistanceAdapter = require('../../types/PersistanceAdapter/PersistanceAdapter');

class MemoryAdapter extends PersistanceAdapter {
  constructor(props) {
    super(props);
    this.store = {
      databases: {},
    };
  }
}

MemoryAdapter.prototype.connectAdapter = require('./methods/connectAdapter');
MemoryAdapter.prototype.createCollection = require('./methods/createCollection');
MemoryAdapter.prototype.createDatabase = require('./methods/createDatabase');
MemoryAdapter.prototype.disconnectAdapter = require('./methods/disconnectAdapter');
MemoryAdapter.prototype.findCollection = require('./methods/findCollection');
MemoryAdapter.prototype.findDatabase = require('./methods/findDatabase');
MemoryAdapter.prototype.findOneDocumentInCollection = require('./methods/findOneDocumentInCollection');
MemoryAdapter.prototype.findOneDocumentInCollectionByObjectId = require('./methods/findOneDocumentInCollectionByObjectId');
MemoryAdapter.prototype.insertOneDocumentToCollection = require('./methods/insertOneDocumentToCollection');
MemoryAdapter.prototype.serializeMeta = require('./methods/serializeMeta');

module.exports = MemoryAdapter;
