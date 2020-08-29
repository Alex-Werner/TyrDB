const each = require('lodash.foreach');
const converter = require('../../../utils/converter');

module.exports = async function updateMetadata(){
  const {data} = this;

  const fields = [];

  each(data, (field, fieldName)=>{
    const fieldType = converter.fieldToTypeInt(field);
    fields.push([fieldName, fieldType]);
  })
  this._fields = fields;

}
