const Database = require('../../../types/Database/Database');

module.exports = async function createDatabase(tyrInstance, dbName){
  const db = new Database({name:dbName, adapter:this, tyrInstance});
  const path = `${tyrInstance.options.path}/${dbName}/meta.json`;
  const job = this.queue.add('File.create', path, db.export());
  await job.execution();
  return db;
};
