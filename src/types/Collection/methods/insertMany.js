export default  async function insertMany(documents){
  const results = await this.getTree().insertDocuments(documents);
  return {
    results,
  }
}
