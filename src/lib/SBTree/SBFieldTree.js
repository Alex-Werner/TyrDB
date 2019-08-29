const SBFieldRootNode= require('./SBFieldRootNode')
const SBFieldLeafNode = require('./SBFieldLeafNode');
const determineLeaf = (tree, value)=> {
  if(tree.size<tree.options.maxNodeSize){
    return 0;
  } else if(tree.size === tree.options.maxNodeSize){
    const last = tree.leafNodes[0].keys[tree.size-1];
    if(value>last) return 1;
    return 0;
  }

  let leaf = 0;
  tree.keys.forEach((key)=>{
    if(value<=key) return;
    leaf++;
  })
  return leaf;
}
class SBFieldTree {
  constructor(props){
    this.options = {
      maxNodeSize:2
    }
    this.fieldName = (props.fieldName) ? props.fieldName : null;
    this.keys = []
    this.leafNodes = [new SBFieldLeafNode(this.options.maxNodeSize)];
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

  insertValue(objectId, value){
    let leaf = determineLeaf(this, value);
    if(this.leafNodes[leaf].size===this.leafNodes[leaf].maxSize){
      const last = this.leafNodes[leaf].pop();
      if(!this.leafNodes[leaf+1]){
        this.leafNodes.push(new SBFieldLeafNode(this.options.maxNodeSize))
        this.keys = [last[1]];
      }
      this.leafNodes[leaf+1].insert(last[0], last[1]);
      console.log(this.leafNodes)

    }
    this.leafNodes[leaf].insert(objectId, value);
    this.size +=1;
  }
};
module.exports = SBFieldTree;
