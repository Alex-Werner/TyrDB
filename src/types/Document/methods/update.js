export default  async function update(_update){
  Object.assign(this, _update)
  const result = [this];
  return {
    result,
  }
}
