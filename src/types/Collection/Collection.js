const {SBTree, adapters} = require('sbtree')
const defaultProps = {
  name: 'default_col',
}
class Collection {
  #adapter;
  #tyrInstance;
  #tree;
  constructor(props) {
    this.name = (props.name) ? props.name : defaultProps.name;
    this.parentDatabaseName = (props.parentDatabaseName) ? props.parentDatabaseName : null;
    this.#tyrInstance = props.tyrInstance;


    const adapterName = this.#tyrInstance.persistanceAdapter.constructor.name;
    if(!adapters[adapterName]){
      throw new Error(`Missing adapter for SBTree : ${adapterName}`)
    }

    const adapterOpts = Object.assign({}, this.#tyrInstance.options);
    console.log(this.#tyrInstance)
    adapterOpts.path += `/${this.name}`
    const adapter = new adapters[adapterName](this.#tyrInstance.options);
    // this.#tree = new SBTree({order:127, adapter});

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
