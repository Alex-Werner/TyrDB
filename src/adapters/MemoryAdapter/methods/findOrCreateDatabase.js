const Database = require('../../../types/Database/Database');

function findOrCreateDatabase(tyrInstance, dbName){
  if(!this.store.databases[dbName]){
    this.store.databases[dbName] = {
      db:new Database({name:dbName, adapter:this, tyrInstance}),
      collections:{}
    }
  }
  return this.store.databases[dbName].db
};
module.exports = findOrCreateDatabase;
