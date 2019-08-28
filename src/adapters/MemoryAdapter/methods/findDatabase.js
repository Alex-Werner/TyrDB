module.exports = async function findDatabase(tyrInstance,dbName,opts){
    return this.store.databases[dbName] && this.store.databases[dbName].db
}
