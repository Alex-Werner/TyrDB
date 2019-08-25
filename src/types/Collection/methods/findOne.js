module.exports = function findOne(selector = {}, opts = {}){
  return this.find(selector, opts).limit(1);
}
