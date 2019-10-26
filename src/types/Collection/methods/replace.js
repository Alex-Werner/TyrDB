module.exports = async function replace(document){
  return await this.getTree().replaceDocuments(document);
}
