const Collection = require('../../../types/Collection/Collection');
const {find, matches} = require('lodash');

function findOneDocumentInCollectionByObjectId(tyrInstance, dbName, colName, objectid){
  if(!dbName) throw new Error('Expected DB name');
  const documents = this.store.databases[dbName].collections[colName].documents;
  return documents[objectid];;
};

module.exports = findOneDocumentInCollectionByObjectId;
