const ObjectID = require("mongo-objectid");
const {clone} = require("lodash");
const cleanPrivateProps = require('./methods/private/cleanPrivateProps');

class Document {
  constructor(props = {}){
    Object.assign(this, ...clone(cleanPrivateProps(props)));
    if(!this._id){
      this._id = new ObjectID();
    }
  }
};
Document.prototype.export = require('./methods/export');
Document.prototype.serialize = require('./methods/serialize');
Document.prototype.update = require('./methods/update');
Document.prototype.replace = require('./methods/replace');
module.exports = Document;
