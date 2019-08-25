module.exports = function findOneAndReplace(selector = {}, document, opts = {}){
  return this.replaceOne(selector, document);
}
