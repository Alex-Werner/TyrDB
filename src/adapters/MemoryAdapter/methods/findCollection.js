module.exports = async function findCollection(tyrInstance, dbName, colName,opts){
    return this.store.databases[dbName].collections[colName] && this.store.databases[dbName].collections[colName].collection
}
