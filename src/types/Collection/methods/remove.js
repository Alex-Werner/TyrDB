module.exports = async function remove(selector = {}, opts = {}){
  return await this.getTree().deleteDocuments(selector);
}
