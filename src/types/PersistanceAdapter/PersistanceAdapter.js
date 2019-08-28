module.exports = class PersistanceAdapter {
  #tyrInstance
  constructor(props){
    this.isConnected = false;
    this.isSync = false;
  }
  getTyrInstance(){
    return this.#tyrInstance;
  }
  setTyrInstance(tyrInstance){
    this.#tyrInstance = tyrInstance;
  }
  connectAdapter(){
    throw new Error('Not implemented')
  }
  createDatabase(){
    throw new Error('Not implemented')
  }
  syncDatabase(){
    throw new Error('Not implemented')
  }
  deleteDatabase(){
    throw new Error('Not implemented')
  }
  exportDatabase(){
    throw new Error('Not implemented')
  }
  findDatabase(){
    throw new Error('Not implemented')
  }
  findCollection(){
    throw new Error('Not implemented')
  }
  createCollection(){
    throw new Error('Not implemented')
  }
  async findOrCreateCollection(tyrInstance,dbName, collName, opts){
    const db = await this.findCollection(tyrInstance, dbName, collName,opts)
    if(!db){
      return this.createCollection(tyrInstance, dbName, collName, opts);
    }
    return db
  }
  async findOrCreateDatabase(tyrInstance, dbName){
    const db = await this.findDatabase(tyrInstance, dbName)
    if(!db){
      return this.createDatabase(tyrInstance, dbName);
    }
    return db
  }
}
