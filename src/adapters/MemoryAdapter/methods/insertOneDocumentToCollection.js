const Document = require('../../../types/Document/Document')

function insertOneDocumentToCollection(dbName, colName, document){
  const newDocument = new Document(document);
  this.store.databases[dbName].collections[colName].documents[newDocument._id] = newDocument
  return newDocument;
};
module.exports = insertOneDocumentToCollection
