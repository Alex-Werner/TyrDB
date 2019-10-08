const Collection = require('../../../types/Collection/Collection');
module.exports = async function findCollection(tyrInstance, dbName, colName, opts){
    let col = undefined;
    if(!dbName){
        throw new Error("Expected dbName");
    }
    if(!colName){
        throw new Error("Expected colName");
    }
    const path = `${tyrInstance.options.path}/${dbName}/${colName}/meta.json`
    const exists = await this.queue.add('File.exists', path).getResults();
    if(!exists){
        //This is done to match MemoryAdapter way of failing a find
        return col;
    }
    const meta = await this.queue.add('File.read',path).getResults();
    col = new Collection(Object.assign(meta,{ adapter:this, tyrInstance}, opts));

    return new Promise((resolve)=>{
        col.emitter.on('ready', ()=>{
            return resolve(col)
        })
    })
}
