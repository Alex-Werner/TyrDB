class SBFieldRootNode {
  constructor(props) {
    this.keys = [];
  }

}
class SBFieldLeafNode {
  constructor(){
    this.keys = [];
    this.values = [];
  }
  insert(objectid, value){
    this.keys.push(value);
    this.values.push(objectid);
  }
  getKey(key){
    const pos = this.values.indexOf(key);
    return this.keys[pos];
  }
  getValue(value){
    const pos = this.keys.indexOf(value);
    return this.values[pos]
  }
}
class SBFieldTree {
  constructor(props){
    this.fieldName = (props.fieldName) ? props.fieldName : null;
    this.root = new SBFieldRootNode();
    this.leafNodes = [new SBFieldLeafNode()];
    this.size = 0;
    this.maxNodeSize = 32;
  }
  getValueFromObjectId(objectId){
    let leaf = 0;
    if(this.size<this.maxNodeSize){
      return this.leafNodes[leaf].getKey(objectId);
      // const {objectId, value} = this.leafNodes[leaf].get(value);
    }
  }
  getFromValue(value){
    let leaf = 0;
    if(this.size<this.maxNodeSize){
      return this.leafNodes[leaf].getValue(value);
      // const {objectId, value} = this.leafNodes[leaf].get(value);
    }
    // return {objectId, value};
  }
  insertValue(objectId, value){
    let leaf = 0;
    if(this.size<this.maxNodeSize){
      this.leafNodes[leaf].insert(objectId, value);
    }
    this.size +=1;
  }
};
module.exports = SBFieldTree;
