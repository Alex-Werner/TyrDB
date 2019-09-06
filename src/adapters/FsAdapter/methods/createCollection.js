const Collection = require('../../../types/Collection/Collection');

module.exports = async function createCollection(tyrInstance, dbName, colName, opts){
    const collection = new Collection(Object.assign({name:colName, adapter:this, tyrInstance, parentDatabaseName:dbName},opts))
    const path = `${tyrInstance.options.path}/${dbName}/${colName}/meta.json`;
    //FIXME : Do we actually really want to wait ?
    await this.queue.add('File.create',path, collection.export()).execution();
    return collection;
};
