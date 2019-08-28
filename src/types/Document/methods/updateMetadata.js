const {each}=require('lodash');
const converter = require('../../../utils/converter');
const btree = require('btreejs');

module.exports = async function updateMetadata(){
  const {data} = this;

  const fields = [];
  this.btree = btree.create();

  each(data, (field, fieldName)=>{
    const fieldType = converter.fieldToTypeInt(field);
    fields.push([fieldName, fieldType]);
  })
  this._fields = fields;

}
