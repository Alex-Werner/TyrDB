module.exports = async function replace(_replace){
  this.deleteAllNonMetaProperties()
  return this.update(_replace);
}
