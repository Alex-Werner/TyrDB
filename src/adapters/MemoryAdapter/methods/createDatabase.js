import Database from '../../../types/Database/Database.js';

export default  async function createDatabase(tyrInstance, dbName){
    const db = new Database({name:dbName, adapter:this, tyrInstance});

    this.store.databases[dbName] = {
        db:new Database({name:dbName, adapter:this, tyrInstance}),
        collections:{}
    }
    return db;

};
