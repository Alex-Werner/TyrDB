module.exports = async function db(dbName) {
  if (!this.databases[dbName]) {
    let db = await this.persistanceAdapter.findOrCreateDatabase(this, dbName)
    this.databases[db.name] = {
      db:db,
      collections:{}
    }
    return db;
  }
  return this.databases[dbName].db;
}
