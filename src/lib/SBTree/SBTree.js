const SBNode = require('./SBNode')
const SBFieldTree = require('./SBFieldTree')
const SBRootNode = require('./SBRootNode');
const {each} = require('lodash');
const defaultOpts = {
  size: 0,
  maxNodeSize:32
}
class SBTree {
  constructor(props={}){
    this.size = (props.size && props.size >= 3)? props.size : defaultOpts.size;
    this.maxNodeSize = (props.maxNodeSize) ? props.maxNodeSize : defaultOpts.maxNodeSize;
    this.root = new SBRootNode();
    this.fieldNode = []
  }

  insertDocument(document){
    this.root.insert(document);
    this.size += 1;
  }
  findDocument(params){
    return this.root.query(params);
  }
  addFieldNode(fieldName){
    this.root.insert(fieldName);
    // this.fieldNode.push(new SBFieldNode({fieldName}))
  }
};
module.exports = SBTree;
