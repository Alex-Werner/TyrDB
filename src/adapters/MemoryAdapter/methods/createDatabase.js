const Database = require('../../../types/Database/Database');

module.exports = async function createDatabase(tyrInstance, dbName){
    const db = new Database({name:dbName, adapter:this, tyrInstance});

    this.store.databases[dbName] = {
        db:new Database({name:dbName, adapter:this, tyrInstance}),
        collections:{}
    }
    return db;

};
