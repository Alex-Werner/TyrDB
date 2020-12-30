const Database = require('../../../types/Database/Database');

module.exports = async function findDatabase(tyrInstance, dbName, opts) {
  let db;
  if (!dbName) {
    throw new Error('Expected dbName');
  }
  let job = await this.queue.add('File.exists', `${tyrInstance.options.path}/${dbName}/meta.json`).execution();

  const exists = job.results;
  if (!exists) {
    // This is done to match MemoryAdapter way of failing a find
    return db;
  }

  job = await this.queue
    .add('File.read', `${tyrInstance.options.path}/${dbName}/meta.json`)
    .execution();

  const meta = job.result;

  db = new Database(Object.assign(meta, { adapter: this, tyrInstance }));
  return db;
};
