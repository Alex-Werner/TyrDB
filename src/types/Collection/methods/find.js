const findDocuments = require('../ops/findDocuments');
module.exports = function find(selector = {}, opts = {}){
  return findDocuments(this, selector, opts);
}
