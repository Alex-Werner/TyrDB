const findDocument = require('../ops/findDocument');
module.exports = function get(objectid){
  return findDocument(this, objectid);
}
