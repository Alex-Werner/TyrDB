const cleanPrivateProps = require('./cleanPrivateProps');
module.exports = function getFieldsMetadata(props){
  const fieldMetadata = Object.keys(cleanPrivateProps(props))
  return fieldMetadata;
}
