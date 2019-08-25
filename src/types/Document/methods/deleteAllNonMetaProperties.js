
module.exports = async function deleteAllNonMetaProperties(){
  const self = this;
  Object.keys(this).forEach(function(key) {
    if(key!=='_id'){
      delete self[key];
    }
  });
  return this;
}
