export default  function serialize(){
  return JSON.parse(JSON.stringify(this))
}
