const updateDocuments = require('../ops/updateDocuments');
module.exports = function replaceOne(selector = {}, document, opts = {}){
  return updateDocuments(this, selector, document, opts);
}
