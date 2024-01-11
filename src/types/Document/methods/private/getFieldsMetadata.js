// const cleanPrivateProps = require('./cleanPrivateProps');
import cleanPrivateProps from './cleanPrivateProps.js';
export default  function getFieldsMetadata(props){
  const fieldMetadata = Object.keys(cleanPrivateProps(props))
  return fieldMetadata;
}
