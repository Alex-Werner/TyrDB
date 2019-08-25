const ObjectID = require("bson-objectid");
const {clone} = require("lodash");
class Document {
  constructor(props = {}){
    //FIXME : This is absolutely not a vaid ObjectID, it just return a hex representation of time, while it should be
    // something like 5 bytes of times + random bytes + random coutner
    // Let's not create another repo/project yet.
    this._id = ObjectID();
    Object.assign(this, clone(props));
  }
};
Document.prototype.deleteAllNonMetaProperties = require('./methods/deleteAllNonMetaProperties');
Document.prototype.update = require('./methods/update');
Document.prototype.replace = require('./methods/replace');
module.exports = Document;
