import each from 'lodash.foreach';
import converter from '../../../utils/converter.js';
export default  async function updateMetadata(){
  const {data} = this;

  const fields = [];

  each(data, (field, fieldName)=>{
    const fieldType = converter.fieldToTypeInt(field);
    fields.push([fieldName, fieldType]);
  })
  this._fields = fields;

}
