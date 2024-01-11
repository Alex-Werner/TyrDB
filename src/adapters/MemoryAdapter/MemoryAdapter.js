import PersistanceAdapter from '../../types/PersistanceAdapter/PersistanceAdapter.js';
import serializeMeta from './methods/serializeMeta.js';
import insertOneDocumentToCollection from './methods/insertOneDocumentToCollection.js';
import findOneDocumentInCollectionByObjectId
  from './methods/findOneDocumentInCollectionByObjectId.js';
import findOneDocumentInCollection from './methods/findOneDocumentInCollection.js';
import findDatabase from './methods/findDatabase.js';
import findCollection from './methods/findCollection.js';
import disconnectAdapter from './methods/disconnectAdapter.js';
import createDatabase from './methods/createDatabase.js';
import createCollection from './methods/createCollection.js';
import connectAdapter from './methods/connectAdapter.js';
class MemoryAdapter extends PersistanceAdapter {
  constructor(props) {
    super(props);
    this.store = {
      databases: {},
    };
  }
}

MemoryAdapter.prototype.connectAdapter = connectAdapter;
MemoryAdapter.prototype.createCollection = createCollection;
MemoryAdapter.prototype.createDatabase = createDatabase;
MemoryAdapter.prototype.disconnectAdapter = disconnectAdapter;
MemoryAdapter.prototype.findCollection = findCollection;
MemoryAdapter.prototype.findDatabase = findDatabase;
MemoryAdapter.prototype.findOneDocumentInCollection = findOneDocumentInCollection;
MemoryAdapter.prototype.findOneDocumentInCollectionByObjectId = findOneDocumentInCollectionByObjectId;
MemoryAdapter.prototype.insertOneDocumentToCollection = insertOneDocumentToCollection;
MemoryAdapter.prototype.serializeMeta = serializeMeta;

export default  MemoryAdapter;
