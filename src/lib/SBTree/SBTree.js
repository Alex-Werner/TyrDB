const SBFieldTree = require('./SBFieldTree')
const SBRootNode = require('./SBRootNode');
const Document = require('../../types/Document/Document');
const ObjectId = require('../ObjectId/ObjectId');
const {map, clone} = require('lodash');
const defaultOpts = {
  size: 0,
  maxNodeSize:16
};
const removeMetadata = (documents)=>{
  return map(documents, (document)=>{
    return document
  })
}
class SBTree {
  constructor(props={}){
    this.size = (props.size && props.size >= 3)? props.size : defaultOpts.size;
    this.maxNodeSize = (props.maxNodeSize) ? props.maxNodeSize : defaultOpts.maxNodeSize;
    this.root = new SBRootNode();
    this.fieldNode = []
  }

  insertDocuments(documents){
    if(Array.isArray(documents)){
      return map(documents, (document)=>{
        return this.insertDocuments(document);
      })
    }
    const document = clone(documents);
    if(!document._id || !new ObjectId(document._id).isValid()){
      document._id = new ObjectId().toString();
      return this.insertDocuments((document));
    }
    this.root.insert(document);
    this.size += 1;
  }
  findDocuments(params){
    return (this.root.query(params));
  }
  getDocument(objectId){
    return (this.root.get(objectId));
  }
};
module.exports = SBTree;
