import MemoryAdapter from '../../adapters/MemoryAdapter/MemoryAdapter.js';
import FsAdapter from '../../adapters/FsAdapter/FsAdapter.js';
import EventEmitter from 'eventemitter2';
import is from '../../utils/is.js';
import Event from '../Event.js';
import pkg from '../../../package.json' assert { type: "json" };
import serializeMeta from './methods/serializeMeta.js';
import db from './methods/db.js';
import initialize from './methods/initialize.js';
import close from './methods/close.js';
import connect from './methods/connect.js';
const pkgVersion = pkg.version;
const defaultProps = {
  options:{
    path: '.db',
    autoInitialize: true,
    autoConnect: true,
  },
  databases: [],
  databaseVersion: pkgVersion
};

const loadAdapter = function(adapterProps){
  const name = adapterProps.name || adapterProps.constructor.name
  switch (name) {
    case "FsAdapter":
      return new FsAdapter();
    case "MemoryAdapter":
      return new MemoryAdapter();
    default:
      throw new Error(`Unsupported adapter ${adapterProps.name} ${JSON.stringify(adapterProps)}`);
  }
}
class TyrDB {
  #emitter = new EventEmitter();

  emit(event, ...values) {
    if (event.constructor.name === Event.name) {
      return this.#emitter.emit(event.name, event.payload);
    }
    return this.#emitter.emit(event, ...values);
  }

  on(eventName, callback) {
    return this.#emitter.on(eventName, callback);
  }

  once(eventName, callback) {
    return this.#emitter.once(eventName, callback);
  }
  constructor(props = {}) {
    // if(typeof props === 'string'){
    //   props = JSON.parse(props);
    // }
    // console.log(props.options.path, props)
    this.options = {
      path:(props.path) ? props.path : defaultProps.options.path,
      autoInitialize :(!is.undef(props.autoInitialize)) ? props.autoInitialize : defaultProps.options.autoInitialize,
      autoConnect:(!is.undef(props.autoConnect)) ? props.autoConnect : defaultProps.options.autoConnect,
    };
    this.state = {
      isConnected: false,
      isConnecting: false
    }
    this.persistanceAdapter = (props.adapter) ? loadAdapter(props.adapter) : new MemoryAdapter();
    this.databases = (props.databases) ? props.databases : defaultProps.databases;
    this.databaseVersion = (props.databaseVersion) ? props.databaseVersion : defaultProps.databaseVersion;

    const self = this;
    setTimeout(async () => {
      if (self.options.autoInitialize) {
        await self.initialize();
      }
      this.emit(new Event('ready'));
    })
  }
  getEmitter(){
    return this.#emitter;
  }
};
TyrDB.prototype.close = close;
TyrDB.prototype.connect = connect
TyrDB.prototype.db = db
TyrDB.prototype.initialize = initialize
TyrDB.prototype.serializeMeta = serializeMeta
export default  TyrDB;
