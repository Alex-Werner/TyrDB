const Database = require('../../../types/Database/Database');
module.exports = async function findDatabase(tyrInstance, dbName, opts){
  let db = undefined;
  if(!dbName){
    throw new Error("Expected dbName");
  }
  const job = await this.queue.add('File.exists', `${tyrInstance.options.path}/${dbName}/meta.json`);
  await job.execution();

  const exists = job.results
  if(!exists){
    //This is done to match MemoryAdapter way of failing a find
    return db;
  }
  const meta = await this.queue
      .add('File.read',`${tyrInstance.options.path}/${dbName}/meta.json`)
      .getResults();

  db = new Database(Object.assign(meta,{ adapter:this, tyrInstance}));
  return db;
}
