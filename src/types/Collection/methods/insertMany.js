module.exports = async function insertMany(documents){
  const results = await this.getTree().insertDocuments(documents);
  return {
    results,
  }
}
