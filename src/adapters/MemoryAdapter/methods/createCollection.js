const Collection = require('../../../types/Collection/Collection');

module.exports = async function createCollection(tyrInstance, dbName, colName, opts){
    console.log('===')
    console.log(opts)
    const collection = new Collection(Object.assign({name:colName, adapter:this, tyrInstance, parentDatabaseName:dbName},opts))

    this.store.databases[dbName].collections[colName] = {
        collection:collection,
        documents:{}
    }
    return collection;

};
