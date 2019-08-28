const is = require('../../../../utils/is')
const defaultProps = {
  revision: 0,
  version: 0
}
module.exports = function getMetadataFromProps(props){
  return {
    // Todo : We should use same date for ObjectID creation, we need our own ObjectID type...
    created :(!is.undef(props._meta) && !is.undef(props._meta.created)) ? props._meta.created : +new Date(),
    revision :(!is.undef(props._meta) && !is.undef(props._meta.revision)) ? props._meta.revision : defaultProps.revision,
    version :(!is.undef(props._meta) && !is.undef(props._meta.version)) ? props._meta.version : defaultProps.version,
  }
}
