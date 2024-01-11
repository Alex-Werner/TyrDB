import Database from '../../../types/Database/Database.js';
export default  async function createDatabase(tyrInstance, dbName){
  const db = new Database({name:dbName, adapter:this, tyrInstance});
  const path = `${tyrInstance.options.path}/${dbName}/meta.json`;
  const job = this.queue.add('File.create', path, db.export());
  await job.execution();
  return db;
};
