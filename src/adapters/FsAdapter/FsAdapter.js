const PersistanceAdapter = require('../../types/PersistanceAdapter/PersistanceAdapter')
class FsAdapter extends PersistanceAdapter {
  constructor(props){
    super(props);
    throw new Error('Not implemented!');
  }
}
FsAdapter.prototype.connectAdapter = require('./methods/connectAdapter');
module.exports =  FsAdapter;

