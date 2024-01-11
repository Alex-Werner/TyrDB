export default  async function insertOne(payload){
  const result = await this.getTree().insertDocuments(payload);

  return {
    results:result,
  }
}
