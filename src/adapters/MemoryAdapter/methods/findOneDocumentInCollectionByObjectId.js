function findOneDocumentInCollectionByObjectId(tyrInstance, dbName, colName, objectid){
  if(!dbName) throw new Error('Expected DB name');
  const documents = this.store.databases[dbName].collections[colName].documents;
  return documents[objectid];
};

export default  findOneDocumentInCollectionByObjectId;
