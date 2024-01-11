import ObjectID from 'mongo-objectid';
import clone from 'lodash.clone';
import cleanPrivateProps from './methods/private/cleanPrivateProps.js';
import serialize from './methods/serialize.js';
import replace from './methods/replace.js';
import update from './methods/update.js';
import exportFn from './methods/export.js';

class Document {
  constructor(props = {}){
    Object.assign(this, ...clone(cleanPrivateProps(props)));
    if(!this._id){
      this._id = new ObjectID();
    }
  }
};
Document.prototype.export = exportFn;
Document.prototype.serialize = serialize;
Document.prototype.update = update;
Document.prototype.replace = replace;
export default Document;
