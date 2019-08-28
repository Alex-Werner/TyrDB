const addDocumentMetadata = require('./private/addDocumentMetadata')
// const verifyUniqueness = require('./private/verifyUniqueness')
// const sortDocumentsByIndices = require('./private/sortDocumentsByIndices')
module.exports = async function insertOne(payload){
  const tyrInstance = this.getTyrInstance();
  const adapter = this.getAdapter();
  const dbName = this.parentDatabaseName;
  const colName = this.name;

  // verifyUniqueness()
  const document = await adapter.insertOneDocumentToCollection(tyrInstance, dbName, colName, payload)
  addDocumentMetadata(this, document);
  //sortDocumentsByIndices

  const result = [document];
  return {
    result,
  }
}
