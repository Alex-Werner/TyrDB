module.exports = function findOneAndModify(selector = {}, document, opts = {}){
  return this.update(selector, document);
}
