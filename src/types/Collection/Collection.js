const {SBTree, adapters} = require('sbtree');
const EventEmitter = require('eventemitter2').EventEmitter2;

class Collection {
  #adapter;
  #tyrInstance;
  #tree;
  constructor(props) {
    const defaultProps = {
      name: 'default_col',
      exclude:[],
      uniques:[],
      order: 511
    }
    this.isReady = false;

    this.name = (props.name) ? props.name : defaultProps.name;
    this.parentDatabaseName = (props.parentDatabaseName) ? props.parentDatabaseName : null;
    this.#tyrInstance = props.tyrInstance;

    this.emitter = new EventEmitter();

    const adapterName = this.#tyrInstance.persistanceAdapter.constructor.name;
    if(!adapters[adapterName]){
      throw new Error(`Missing adapter for SBTree : ${adapterName}`)
    }

    const adapterOpts = Object.assign({}, this.#tyrInstance.options);
    adapterOpts.path += `/${this.parentDatabaseName}/${this.name}`

    const adapter = new adapters[adapterName](adapterOpts);


    this.uniques = (props.uniques) ? props.uniques : defaultProps.uniques;
    this.exclude = (props.exclude) ? props.exclude : defaultProps.exclude;
    this.order = (props.order) ? props.order : defaultProps.order;
    this.#tree = new SBTree({order:this.order, adapter, uniques:this.uniques, exclude:this.exclude});
    const self = this;

    // SBTree need to perform some stuff like loading state before being ready to use
    // We forward readiness to our collection instance;
    this.#tree.on('ready', ()=>{
      self.isReady = true;
      self.emitter.emit('ready');
    });
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
Collection.prototype.remove = require('./methods/remove')
Collection.prototype.replace = require('./methods/replace')
Collection.prototype.insertMany = require('./methods/insertMany')
Collection.prototype.insertOne = require('./methods/insertOne')
module.exports = Collection;
