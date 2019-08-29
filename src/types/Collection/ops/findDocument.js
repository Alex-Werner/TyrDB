async function findDocument(coll, objectid){
  const adapter = coll.getAdapter();
  const instance = coll.getTyrInstance();

  const document = await adapter.findOneDocumentInCollectionByObjectId(instance, coll.parentDatabaseName, coll.name, objectid);
  return document;
}
module.exports = findDocument;
