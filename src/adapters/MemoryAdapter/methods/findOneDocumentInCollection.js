import find from 'lodash.find';
import matches from 'lodash.matches';

function findOneDocumentInCollection(tyrInstance, dbName, colName, selector, options){
  const documents = this.store.databases[dbName].collections[colName].documents;
  if(selector.hasOwnProperty('_id')){
    return this.findOneDocumentInCollectionByObjectId(tyrInstance, dbName, colName, selector._id);
  }else{
    const document = find(documents,matches({data:selector}));
    return document
  }
};

export default  findOneDocumentInCollection;
