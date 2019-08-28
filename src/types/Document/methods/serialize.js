module.exports = function serialize(){
  return JSON.parse(JSON.stringify(this))
}
