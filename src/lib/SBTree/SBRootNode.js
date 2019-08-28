const {each, intersection} = require('lodash');

const SBFieldTree = require('./SBFieldTree')
class SBRootNode {
  constructor(){
    this.fieldTrees = {};
  }
  getFieldNode(fieldName){
    return this.fieldTrees[fieldName];
  }
  setFieldNode(fieldName){
    if(this.fieldTrees[fieldName]){
      throw new Error();
    }
    const fieldTree = new SBFieldTree({fieldName});
    this.fieldTrees[fieldName]=fieldTree;
    // this.fields.push(fieldName);
    // this.fields = this.fields.sort();
    // this.fields.indexOf(fieldName)
    // .sort().get(fieldName);
  }
  query(params){
    let listOfFieldLookup = [];
    each(params,(paramValue, paramName)=>{
        listOfFieldLookup.push(this.getFieldNode(paramName).getFromValue(paramValue))
        // oids = oids.push(oid)
    });
    const matchingObjectIds = intersection(listOfFieldLookup);
    const documents = [];
    each(matchingObjectIds, (oid)=>{
      documents.push(this.getDocumentFromObjectId(oid));
    })
    return documents;
    // console.log(matchingObjectId)
  }
  getDocumentFromObjectId(oid){
    const document = {};
    each(this.fieldTrees, (fieldTree)=>{
      const val = fieldTree.getValueFromObjectId(oid);
      document[fieldTree.fieldName]=val
    })
    return document;
  }

  insert(document){
    const id = document._id.toString();
    const {data, _fields, _meta} = document;

    each(_fields, (_field)=> {
      const fieldName = _field[0];
      const fieldValue = data[fieldName];
      if(!this.getFieldNode(fieldName)){
        this.setFieldNode(fieldName);
      }
      const fieldNode = this.getFieldNode(fieldName);
      fieldNode.insertValue(id, fieldValue);
    })
  }
};
module.exports = SBRootNode
