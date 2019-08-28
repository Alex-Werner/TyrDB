module.exports = async function insert(payload){
  if(Array.isArray(payload)){
    return this.insertMany(payload);
  }
  return this.insertOne(payload)
}
