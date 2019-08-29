const Collection = require('../../../types/Collection/Collection');
const {find, matches} = require('lodash');

function findOneDocumentInCollection(tyrInstance, dbName, colName, selector, options){
  const documents = this.store.databases[dbName].collections[colName].documents;
  if(selector.hasOwnProperty('_id')){
    return this.findOneDocumentInCollectionByObjectId(tyrInstance, dbName, colName, selector._id);
  }else{
    const document = find(documents,matches({data:selector}));
    return document
  }
};

module.exports = findOneDocumentInCollection;
