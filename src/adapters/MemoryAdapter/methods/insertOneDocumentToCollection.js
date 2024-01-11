import Document from '../../../types/Document/Document.js';
function insertOneDocumentToCollection(tyrInstance, dbName, colName, document){
  const newDocument = new Document(document);
  this.store.databases[dbName].collections[colName].documents[newDocument._id] = newDocument
  return newDocument;
};
export default  insertOneDocumentToCollection
