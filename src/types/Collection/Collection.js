const defaultProps = {
  name: 'default_col',
  documents: []
}
class Collection {
  #adapter;
  #tyrInstance;
  #setIndices = require('./methods/private/setIndices')
  #setUniques = require('./methods/private/setUniques')
  constructor(props) {
    this.name = (props.name) ? props.name : defaultProps.name;
    this.documents = (props.documents) ? props.documents : defaultProps.documents;
    this.#adapter = props.adapter;
    this.#tyrInstance = props.tyrInstance;
    this.parentDatabaseName = (props.parentDatabaseName)
    this.binaryIndices = {};
    this.uniqueNames = [];

    if(props.indices){
      this.#setIndices(props.indices)
    }
    if(props.uniques){
      this.#setUniques(props.uniques)
    }
  }
  getAdapter(){
    return this.#adapter;
  }
  getTyrInstance(){
    return this.#tyrInstance;
  }
};
Collection.prototype.export = require('./methods/export')
Collection.prototype.find = require('./methods/find')
Collection.prototype.insert = require('./methods/insert')
Collection.prototype.insertMany = require('./methods/insertMany')
Collection.prototype.insertOne = require('./methods/insertOne')
module.exports = Collection;
