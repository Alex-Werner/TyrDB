const PersistanceAdapter = require('../../types/PersistanceAdapter/PersistanceAdapter')
class MemoryAdapter extends PersistanceAdapter {
  constructor(props){
    super(props);
    this.store = {
      databases:{}
    };
  }
};
MemoryAdapter.prototype.connectAdapter = require('./methods/connectAdapter');
MemoryAdapter.prototype.findOrCreateDatabase = require('./methods/findOrCreateDatabase');
MemoryAdapter.prototype.findOrCreateCollection = require('./methods/findOrCreateCollection');
MemoryAdapter.prototype.findOneDocumentInCollection = require('./methods/findOneDocumentInCollection');
MemoryAdapter.prototype.insertOneDocumentToCollection = require('./methods/insertOneDocumentToCollection');
module.exports = MemoryAdapter;
