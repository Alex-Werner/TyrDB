import Collection from '../../../types/Collection/Collection.js';

export default  async function createCollection(tyrInstance, dbName, colName, opts){
    const collection = new Collection(Object.assign({name:colName, adapter:this, tyrInstance, parentDatabaseName:dbName},opts))

    this.store.databases[dbName].collections[colName] = {
        collection:collection,
        documents:{}
    }
    return collection;

};
