module.exports = function get(identifier){
  const tree = this.getTree();
  return tree.getDocument(identifier);
}
