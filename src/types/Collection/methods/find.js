module.exports = function find(selector = {}, opts = {}){
  const tree = this.getTree();
  return tree.findDocuments(selector);
}
