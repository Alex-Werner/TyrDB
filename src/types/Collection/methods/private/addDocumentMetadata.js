module.exports = function addDocumentMetadata(self, document) {
  const instance = self.getTyrInstance();
  self.documents[document._id] = document.export()

  // console.log(instance.databases['test_db'].collections["users"].collection.documents)
  // const fieldNames = Object.keys(payload);
  // instance.databases[dbName].collections[colName].documents[document._id] = fieldNames;

  // console.log(this);
}
