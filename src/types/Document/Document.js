const ObjectID = require("../../lib/ObjectId/ObjectId");
const {clone} = require("lodash");
const getMetadataFromProps = require('./methods/private/getMetadataFromProps');
const cleanPrivateProps = require('./methods/private/cleanPrivateProps');


class Document {
  constructor(props = {}){
    this._id = new ObjectID();
    this._meta = getMetadataFromProps(props);
    this.data = clone(cleanPrivateProps(props))
    //TODO : It changes on update or replace

    this.updateMetadata()
  }
};
Document.prototype.export = require('./methods/export');
Document.prototype.serialize = require('./methods/serialize');
Document.prototype.update = require('./methods/update');
Document.prototype.replace = require('./methods/replace');
Document.prototype.updateMetadata = require('./methods/updateMetadata');
module.exports = Document;
