const Collection = require('../../../types/Collection/Collection');

function findOrCreateCollection(tyrInstance, dbName, colName){
  if(!this.store.databases[dbName].collections[colName]){
    this.store.databases[dbName].collections[colName]= {
      collection:new Collection({name:colName, adapter:this, tyrInstance, parentDatabaseName:dbName}),
      documents:{}
    }
  }
  return this.store.databases[dbName].collections[colName].collection;
};
module.exports = findOrCreateCollection;
