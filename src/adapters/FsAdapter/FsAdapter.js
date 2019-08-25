const StoreAdapter = require('../../types/PersistanceAdapter/PersistanceAdapter');
const File = require('./File/File');
const Directory = require('./Directory/Directory');
const Database = require('../../../src/types/Database/Database');
module.exports = class FsAdapter extends StoreAdapter {
  constructor(props){
    super(props);
  }
  async connectAdapter(path){
    if(!path){
      throw new Error("Expected path");
    }
    this.path = path;
    await Directory.ensure(path);
    this.isConnected = true;
    return {isConnected:this.isConnected};
  }
  async findDatabase(dbName){
    const db = {};
    if(!dbName){
      throw new Error("Expected dbName");
    }
    const exists = await File.exists(this.path+'/'+dbName);
    if(!exists){
      db.found = false;
    }

    return db;
  }
  async createDatabase(dbName){
    const db = new Database({name:dbName})
    const path = this.path+'/'+dbName+'/db_root.dat';
    await File.ensure(path, db.export());
    return db;
  }
  async findOrCreateDatabase(dbName){
   const db = await this.findDatabase(dbName);
   if(!db || !db.found){
     return this.createDatabase(dbName);
   }
  }
}
