module.exports = async function insertOne(payload){
  const adapter = this.getAdapter();
  const dbName = this.parentDatabaseName;
  const colName = this.name;
  const document = await adapter.insertOneDocumentToCollection(dbName, colName, payload)

  const instance = this.getTyrInstance();
  const fieldNames = Object.keys(payload);
  instance.databases[dbName].collections[colName].documents[document._id] = fieldNames;

  const result = [document];
  return {
    result,
  }
}
