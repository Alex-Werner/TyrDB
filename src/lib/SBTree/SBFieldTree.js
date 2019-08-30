const SBFieldRootNode= require('./SBFieldRootNode')
const SBFieldLeafNode = require('./SBFieldLeafNode');
const {insertSorted} = require("../../utils/array")
const determineLeaf = (tree, value)=> {
  let leaf = 0;
  tree.keys.forEach((key)=>{
    if(value<=key) return;
    leaf++;
  })
  return leaf;
}
const defaultOpts = {
  maxNowSize:2
}
class SBFieldTree {
  constructor(props){
    this.options = {
      maxNodeSize:(props.maxNodeSize) ? props.maxNodeSize : defaultOpts.maxNodeSize
    }
    this.fieldName = (props.fieldName) ? props.fieldName : null;
    // this.keys = [];
    // this.objectids =[];

    const root = new SBFieldLeafNode(this.options.maxNodeSize)
    root.setTree(this)
    this.nodes = [root];
    this.leafNodes = [];
    this.size = 0;
  }
  getValueFromObjectId(objectId){
    let leaf = 0;
      return this.leafNodes[leaf].getKey(objectId.toString());
  }
  findObjectIds(value){
    let leaf = determineLeaf(this, value);
    return this.leafNodes[leaf].getObjectIds(value);
  }
  moveLastRight(startingLeaf){
    const popedElement = this.leafNodes[startingLeaf].pop(1)[0];
    let rightLeaf = this.leafNodes[startingLeaf+1];
    if(!rightLeaf){
      this.insertInNewLeafNode(popedElement.objectId, popedElement.value)
      rightLeaf = this.leafNodes[startingLeaf+1];
    }
    if(rightLeaf.size===rightLeaf.maxNodeSize){
      this.moveLastRight(startingLeaf+1);
    }else{
      rightLeaf.insert(popedElement.objectId, popedElement.value);
    }
  }
  moveUp(leaf, direction = 'right'){
    if(direction!== 'right') throw new Error('Not implemented');
    const popedElement = this.leafNodes[leaf].pop(1)[0];
    const insertedPos = insertSorted(this.keys, popedElement.value);
    this.objectids.splice(insertedPos, 0, popedElement.objectId);
  }
  splitDown(level,leaf){

  }
  insertInNewLeafNode(objectid, value){
    //We move previous up as it is a key now
    this.moveUp(this.leafNodes.length-1, 'right');
    // We balance by splitting down
    // And create a new leaf
    const leaf = new SBFieldLeafNode(this.options.maxNodeSize, this);
    this.leafNodes.push(leaf);
    // On which we add our stuff
    leaf.insert(objectid,value);
    this.size +=1;
  }
  insertValue(objectId, value){
    this.nodes[0].insert(objectId,value)
    // if(this.size<=2){
    //   insertSorted(this.keys, value)
    //   insertSorted(this.objectids, objectId)
    //   if(this.size===2){
    //     this.splitDown(0,0);
    //   }
    // }
    this.size +=1;
    // switch (this.size) {
    //   case this.size<=2:
    //     insertSorted(this.keys, value)
    //     insertSorted(this.objectids, objectId)
    //     console.log(this.size)
    //     throw new Error()
    //   default:
    //     break;
    // }
    // if(this.size<3){
    //   insertSorted(this.keys, value)
    //   insertSorted(this.objectids, objectId)
    //
    // }else{
    //   this.splitDown(0)
    //   let leaf = determineLeaf(this, value);
      // if(!this.leafNodes[leaf]){
      //   return this.insertInNewLeafNode(objectId, value);
      // }
      // if(this.leafNodes[leaf].size===this.leafNodes[leaf].maxNodeSize) {
      //   this.moveLastRight(leaf);
      // }
      //
      // this.leafNodes[leaf].insert(objectId, value);
  }
};
module.exports = SBFieldTree;
