const PersistanceAdapter = require('../../types/PersistanceAdapter/PersistanceAdapter')

const is = require('../../utils/is')

const defaultProps = {
  autosaveInterval: 5000,
  autosave:true,
  throttledSaves:true
}
class FsSemanticAdapter extends PersistanceAdapter {
  constructor(props = {}){
    super(props);
    this.autosaveInterval=(!is.undef(props.autosaveInterval)) ? props.autosaveInterval : defaultProps.autosaveInterval;
    this.autosave=(!is.undef(props.autosave)) ? props.autosave : defaultProps.autosave;
    this.throttledSaves=(!is.undef(props.throttledSaves)) ? props.throttledSaves : defaultProps.throttledSaves;

    this.state = {
      throttledSavesPending:false
    }
  }
  triggerSave(type, args){
    switch (type) {
      case 'collection':
        if(!args.colName || !args.dbName){
          throw new Error('Asked to save collection without args');
        }
        console.log(this)
        break;
      default:
        throw new Error(`Not handled type ${type}`)
    }
  }
};
FsSemanticAdapter.prototype.connectAdapter = require('./methods/connectAdapter');
FsSemanticAdapter.prototype.createDatabase = require('./methods/createDatabase');
FsSemanticAdapter.prototype.findDatabase = require('./methods/findDatabase');
FsSemanticAdapter.prototype.findCollection = require('./methods/findCollection');
FsSemanticAdapter.prototype.createCollection = require('./methods/createCollection');
FsSemanticAdapter.prototype.findOneDocumentInCollection = require('./methods/findOneDocumentInCollection');
FsSemanticAdapter.prototype.insertOneDocumentToCollection = require('./methods/insertOneDocumentToCollection');
module.exports = FsSemanticAdapter;
