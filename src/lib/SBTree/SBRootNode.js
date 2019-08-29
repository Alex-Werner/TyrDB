const {each, intersection} = require('lodash');

const SBFieldTree = require('./SBFieldTree')

class SBRootNode {
  constructor() {
    this.fieldTrees = {};
  }

  getFieldNode(fieldName) {
    return this.fieldTrees[fieldName];
  }

  setFieldNode(fieldName) {
    if (this.fieldTrees[fieldName]) {
      throw new Error(`Setting on already existing field node ${fieldName}`);
    }
    const fieldTree = new SBFieldTree({fieldName});
    this.fieldTrees[fieldName] = fieldTree;
    // this.fields.push(fieldName);
    // this.fields = this.fields.sort();
    // this.fields.indexOf(fieldName)
    // .sort().get(fieldName);
  }

  query(params) {
    let listOfFieldLookup = [];
    each(params, (paramValue, paramName) => {
      const value = this.getFieldNode(paramName).findObjectIds(paramValue);
      // console.log({value})
      if (value) {
        listOfFieldLookup = listOfFieldLookup.concat(listOfFieldLookup, value)
      } else {
        throw new Error(`No field ${paramName} found`)
      }
    });
    const matchingObjectIds = intersection(listOfFieldLookup);
    const documents = [];
    each(matchingObjectIds, (oid) => {
      // console.log({matchingObjectIds})
      const doc = this.get(oid);
      // console.log({doc})
      documents.push(doc);
    })
    return documents;
    // console.log(matchingObjectId)
  }

  get(oid) {
    if (!oid) throw new Error('Expected an objectid')

    const document = {_id: oid};
    each(this.fieldTrees, (fieldTree) => {
      const oids = fieldTree.getValueFromObjectId(oid);
      document[fieldTree.fieldName] = oids
    })
    return document;
  }

  insert(document) {
    if (!document._id) {
      throw new Error('Expecting all document to have an _id');
    }
    const id = document._id.toString();
    const {data, _fields, _meta} = document;

    each(_fields, (_field) => {
      const fieldName = _field[0];
      const fieldValue = data[fieldName];
      if (!this.getFieldNode(fieldName)) {
        this.setFieldNode(fieldName);
      }
      const fieldNode = this.getFieldNode(fieldName);
      fieldNode.insertValue(id, fieldValue);
    })
  }
};
module.exports = SBRootNode
