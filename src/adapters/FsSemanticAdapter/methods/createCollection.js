const Collection = require('../../../types/Collection/Collection');

module.exports = async function createCollection(tyrInstance, dbName, colName, opts){
    const collection = new Collection(Object.assign({name:colName, adapter:this, tyrInstance, parentDatabaseName:dbName},opts))
    const path = `${tyrInstance.options.path}/${dbName}/${colName}/meta.json`;
    await File.create(path, collection.export());
    return collection;
    // await File.ensure(path, db.export());
    // this.store.databases[dbName] = {
    //     db:new Database({name:dbName, adapter:this, tyrInstance}),
    //     collections:{}
    // }
};
