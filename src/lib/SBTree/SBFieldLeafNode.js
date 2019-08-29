const sortBy = (el, direction = 'asc') =>{
  return el.sort((a,b)=>{
    const v = (direction==='asc') ? 1 : -1;
    const x = (a<b) ? -1 : (a>b)?1:0;
    return x*v
  })
}
class SBFieldLeafNode {
  constructor(maxSize= 16){
    this.keys = [];
    this.size = 0;
    this.maxSize = maxSize;
    this.objectids = [];
  }
  insert(objectid, value){
    this.keys.push(value);
    if(this.size===this.maxSize){
      throw new Error("Cannot insert, please pop")
    }
    this.objectids.push(objectid.toString());
    this.keys = sortBy(this.keys,'asc')
    this.size+=1;
  }
  pop(){
    this.size-=1;
    return [this.objectids.pop(),this.keys.pop()]
  }
  getKey(key){
    const pos = this.objectids.indexOf(key);
    return this.keys[pos];
  }
  getObjectIds(value){
    const objectIds = [];
    let localCounter = this.keys.indexOf(value);
    if(localCounter>-1){
      objectIds.push(this.objectids[localCounter])
      localCounter++;
      while(this.keys[localCounter]===value){
        objectIds.push(this.objectids[localCounter]);
        localCounter++
      }
    }
    return objectIds;

  }
};
module.exports = SBFieldLeafNode;
