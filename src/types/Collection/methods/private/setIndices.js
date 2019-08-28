const {each}=require('lodash');
module.exports = function setIndices(indices){

  // this.binaryIndices[]
  // console.log(this, opts)
  // console.log(this, opts)
  // console.log(this, opts)
  // console.log(this, opts)
  // console.log(this, opts)

  each(indices,(indiceName)=>{
    this.binaryIndices[indiceName] = {
      name:indiceName,
      values:[]//TODO : This value countains the order of ObjectIDS sorted asc
    }
  })
}
