const Database = require('../../../types/Database/Database');
const File = require('../../FsAdapter/File/File');
module.exports = async function findDatabase(tyrInstance, dbName, opts){
    let db = undefined;
    if(!dbName){
        throw new Error("Expected dbName");
    }
    const exists = await File.exists(`${tyrInstance.options.path}/${dbName}/meta.json`);
    if(!exists){
        //This is done to match MemoryAdapter way of failing a find
        return db;
    }
    const meta = await File.read(`${tyrInstance.options.path}/${dbName}/meta.json`);
    db = new Database(Object.assign(meta,{ adapter:this, tyrInstance}));
    return db;
}
