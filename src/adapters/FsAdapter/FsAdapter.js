const PersistanceAdapter = require('../../types/PersistanceAdapter/PersistanceAdapter');
const {FSLock} = require('fslockjs');
class FsAdapter extends PersistanceAdapter {
  constructor(props){
    super(props);
    this.store = {
      databases:{}
    };
    this.queue = new FSLock();
  }
}
FsAdapter.prototype.connectAdapter = require('./methods/connectAdapter');
FsAdapter.prototype.disconnectAdapter = require('./methods/disconnectAdapter');
FsAdapter.prototype.createCollection = require('./methods/createCollection');
FsAdapter.prototype.createDatabase = require('./methods/createDatabase');
FsAdapter.prototype.findDatabase = require('./methods/findDatabase');
FsAdapter.prototype.findCollection = require('./methods/findCollection');
FsAdapter.prototype.serializeMeta = require('./methods/serializeMeta');
module.exports =  FsAdapter;

