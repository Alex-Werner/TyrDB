async function findDocuments(coll, selector, options){
  const adapter = coll.getAdapter();
  const instance = coll.getTyrInstance();

  const document = await adapter.findOneDocumentInCollection(instance, coll.parentDatabaseName, coll.name, selector, options);
  return document;
}
module.exports = findDocuments;
