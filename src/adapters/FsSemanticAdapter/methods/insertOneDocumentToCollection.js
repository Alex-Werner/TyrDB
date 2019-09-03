const Document = require('../../../types/Document/Document')

async function insertOneDocumentToCollection(tyrInstance, dbName, colName, document){
  const newDocument = new Document(document);
  const path = `${tyrInstance.options.path}/${dbName}/${colName}/${newDocument._id}.json`;
  await File.create(path, newDocument.serialize());
  this.triggerSave('collection', {dbName, colName});
  return newDocument;
};
module.exports = insertOneDocumentToCollection
