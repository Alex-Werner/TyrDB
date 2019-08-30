const sortBy = (el, direction = 'asc') =>{
  return el.sort((a,b)=>{
    const v = (direction==='asc') ? 1 : -1;
    const x = (a<b) ? -1 : (a>b)?1:0;
    return x*v
  })
};
let DEBUG = false;
const {insertSorted} = require("../../utils/array")
const determineLeaf = (tree, value)=> {
  let leaf = 0;
  tree.keys.forEach((key)=>{
    if(value<=key) return;
    leaf++;
  })
  return leaf;
}
class SBFieldLeafNode {
  #parent;
  #tree=null;
  setTree(tree){
    this.#tree = tree;
  }
  getTree(){
    return this.#tree;
  }
  constructor(maxSize= 16, parent = null){
    this.keys = [];
    this.levelPos=(parent)? parent.childrens.length : 0;
    this.ids = [];
    this.childrens = [];
    this.size = 0;
    this.maxNodeSize = maxSize;
    this.#parent = parent;
    if(this.#parent){
      this.setTree(this.#parent.getTree())
    }
  }

  insert(id, value, forceLocal=false){
    //We might insert from a downside "splitUp", so we avoid a loop this way
    if(!this.childrens.length || forceLocal){
      const insertedPos = insertSorted(this.keys, value);
      this.ids.splice(insertedPos, 0, id);
      this.size+=1;
    }else {
      const leaf = determineLeaf(this, value);
      this.childrens[leaf].insert(id, value);
    }
    if(this.size>this.maxNodeSize){
      try{
        this.splitUp();
      }catch (e) {
        console.log(e)
        // this.splitDown();
      }
    }

  }
  splitUp(){

    let parent = this.#parent;

    if(!parent) {
      parent = new SBFieldLeafNode(this.maxNodeSize);
      const left = new SBFieldLeafNode(this.maxNodeSize, parent);
      left.levelPos=0;
      const right = new SBFieldLeafNode(this.maxNodeSize, parent);
      right.levelPos=1;

      parent.childrens=[left, right]
      if (this.#tree) {
        parent.setTree(this.#tree);
        left.setTree(this.#tree);
        right.setTree(this.#tree);
        parent.getTree().nodes=[parent];
      }
      console.log(this)
      console.log(this)

    }
    const removed = this.removeMiddle();
    parent.insert(removed.id, removed.value, true)

    this.keys.forEach((key,i)=>{
      const leaf = determineLeaf(parent, key)
      console.log('leaf should be',key, leaf)
      parent.childrens[leaf].insert(this.ids[i],key)
    })
    //   parent.size = 1

      // const right = new SBFieldLeafNode(this.maxNodeSize, this.#parent);
      // const left = this;
      // left.levelPos = this.#parent.childrens.length;
      // right.levelPos = left.levelPos+1;
    //   const popped = this.pop(this.size/2);
    //   popped.forEach((doc)=>{
    //     right.insert(doc.id, doc.value)
    //   })
    //
    //   right.childrens = left.childrens.splice(-2,2)
    //   // right.childrens = excessiveChildren;
    //   // right.childrens.forEach((child,i)=>{
    //   //   child.levelPos=i
    //   // })
    //   // left.childrens.forEach((child,i)=>{
    //   //   child.levelPos=i
    //   // })
    //
    //   this.#parent.childrens=[left, right];
    //   this.#tree.nodes=[parent];
    // }else{

      // const removed = this.removeMiddle();
      // parent.insert(removed.id, removed.value, true)

      // this.keys.forEach((key,i)=>{
      //   const leaf = determineLeaf(parent, key)
      //   parent.childrens[leaf].insert(this.ids[i],key)
      // })
  }
  removeMiddle(){
    const mid = ~~(this.size/2);
    const spliced = {value:this.keys.splice(mid, 1)[0], id:this.ids.splice(mid, 1)[0]};
    this.size-=1;
    return spliced;
  }
  splitRight(){
    const left = this;
    const right = new SBFieldLeafNode(this.maxNodeSize, this.#parent)
    right.setTree(this.getTree())
    const popped = this.pop(this.size/2);
    popped.forEach((doc)=>{
      right.insert(doc.id, doc.value)
    })
    console.log({right})
    this.#parent.childrens.splice(determineLeaf(this.#parent, popped[0].value)+1,0, right)

  }
  splitDown(){
    const left = new SBFieldLeafNode(this.maxNodeSize, this);
    const shift = this.shift(1);
    this.size-=1;

    const right = new SBFieldLeafNode(this.maxNodeSize, this)
    const pop = this.pop(1);
    this.size-=1;

    this.childrens.push(left, right);
    left.insert(shift[0].id, shift[0].value)
    right.insert(pop[0].id, pop[0].value)

  }
  shift(shiftSize=1){
    const shifted = [];
    while(shifted.length<shiftSize){
      shifted.push({id:this.ids.shift(),value:this.keys.shift()})
    }
    this.size-=1;
    return shifted;
  }
  pop(popSize=1){
    const popped = [];
    while(popped.length<popSize){
      popped.push({id:this.ids.pop(),value:this.keys.pop()})
    }
    this.size-=1;
    return popped;
  }
  getKey(key){
    const pos = this.ids.indexOf(key);
    return this.keys[pos];
  }
  getObjectIds(value){
    const ids = [];
    let localCounter = this.keys.indexOf(value);
    if(localCounter>-1){
      ids.push(this.ids[localCounter])
      localCounter++;
      while(this.keys[localCounter]===value){
        ids.push(this.ids[localCounter]);
        localCounter++
      }
    }
    return ids;

  }
};
module.exports = SBFieldLeafNode;
