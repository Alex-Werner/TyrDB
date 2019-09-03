const {SBTree} = require('sbtree')
const defaultProps = {
  name: 'default_col',
}
class Collection {
  #adapter;
  #tyrInstance;
  #tree;
  constructor(props) {
    this.name = (props.name) ? props.name : defaultProps.name;
    this.documents = (props.documents) ? props.documents : [];
    this.#tyrInstance = props.tyrInstance;

    this.#tree = new SBTree({order:127});

    this.parentDatabaseName = (props.parentDatabaseName);

    if(props.indices){
      throw new Error('Not implemented : Indices')
    }
    if(props.uniques){
      throw new Error('Not implemented : Unique field')
    }
  }
  getTree(){
    return this.#tree;
  }
  getAdapter(){
    return this.#adapter;
  }
  getTyrInstance(){
    return this.#tyrInstance;
  }
};
Collection.prototype.export = require('./methods/export')
Collection.prototype.get = require('./methods/get')
Collection.prototype.find = require('./methods/find')
Collection.prototype.insert = require('./methods/insert')
Collection.prototype.insertMany = require('./methods/insertMany')
Collection.prototype.insertOne = require('./methods/insertOne')
module.exports = Collection;
