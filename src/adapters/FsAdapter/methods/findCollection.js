const Collection = require('../../../types/Collection/Collection');

module.exports = async function findCollection(tyrInstance, dbName, colName, opts) {
  let col;
  if (!dbName) {
    throw new Error('Expected dbName');
  }
  if (!colName) {
    throw new Error('Expected colName');
  }
  const path = `${tyrInstance.options.path}/${dbName}/${colName}/meta.json`;
  let job = await this.queue.add('File.exists', path).execution();
  const exists = job.result;
  if (!exists) {
    // This is done to match MemoryAdapter way of failing a find
    return col;
  }
  job = await this.queue.add('File.read', path).execution();
  const meta = job.result;
  col = new Collection(Object.assign(meta, { adapter: this, tyrInstance }, opts));

  return new Promise((resolve) => {
    col.emitter.on('ready', () => resolve(col));
  });
};
