const MemoryAdapter = require('../../adapters/MemoryAdapter/MemoryAdapter');
const FsAdapter = require('../../adapters/FsAdapter/FsAdapter');
const EventEmitter = require('eventemitter2').EventEmitter2;
const Event = require('../Event');
const pkgVersion = require('../../../package.json').version;

const is = require('../../utils/is')
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
      console.log('FS')
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
TyrDB.prototype.close = require('./methods/close')
TyrDB.prototype.connect = require('./methods/connect')
TyrDB.prototype.db = require('./methods/db')
TyrDB.prototype.initialize = require('./methods/initialize')
TyrDB.prototype.serializeMeta = require('./methods/serializeMeta')
module.exports = TyrDB;
