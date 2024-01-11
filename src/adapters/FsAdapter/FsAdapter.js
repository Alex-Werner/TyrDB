import {FSLock} from 'fslockjs';
import PersistanceAdapter from '../../types/PersistanceAdapter/PersistanceAdapter.js';
import serializeMeta from './methods/serializeMeta.js';
import findCollection from './methods/findCollection.js';
import findDatabase from './methods/findDatabase.js';
import createDatabase from './methods/createDatabase.js';
import createCollection from './methods/createCollection.js';
import disconnectAdapter from './methods/disconnectAdapter.js';
import connectAdapter from './methods/connectAdapter.js';

class FsAdapter extends PersistanceAdapter {
  constructor(props){
    super(props);
    this.store = {
      databases:{}
    };
    this.queue = new FSLock();
  }
}
FsAdapter.prototype.connectAdapter = connectAdapter;
FsAdapter.prototype.disconnectAdapter = disconnectAdapter;
FsAdapter.prototype.createCollection = createCollection;
FsAdapter.prototype.createDatabase = createDatabase;
FsAdapter.prototype.findDatabase = findDatabase;
FsAdapter.prototype.findCollection = findCollection;
FsAdapter.prototype.serializeMeta = serializeMeta;
export default FsAdapter;

