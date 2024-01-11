import { SBTree } from 'sbtree';
import * as adapters from 'sbtree/src/adapters/index.js'
import EventEmitter from 'eventemitter2';
import exportFn from './methods/export.js';
import get from './methods/get.js';
import find from './methods/find.js';
import findOne from './methods/findOne.js';
import insert from './methods/insert.js';
import remove from './methods/remove.js';
import count from './methods/count.js';
import insertOne from './methods/insertOne.js';
import insertMany from './methods/insertMany.js';
import replace from './methods/replace.js';
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
Collection.prototype.export = exportFn;
Collection.prototype.get = get;
Collection.prototype.find = find;
Collection.prototype.findOne = findOne;
Collection.prototype.insert = insert
Collection.prototype.remove = remove;
Collection.prototype['delete'] = remove;
Collection.prototype.count = count;
Collection.prototype.replace = replace;
Collection.prototype.insertMany = insertMany;
Collection.prototype.insertOne = insertOne;
export default  Collection;
