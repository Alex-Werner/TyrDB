module.exports = function findOneAndDelete(selector = {}, opts = {}){
  return this.findAndModify(selector, null, opts).limit(1);
}
