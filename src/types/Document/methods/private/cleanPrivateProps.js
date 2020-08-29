const reduce = require("lodash.reduce");

module.exports = cleanPrivateProps = (props) => {
  return reduce(props,(obj, prop, propName)=>{
    if(propName[0]!=='_') obj[propName]=prop;
    return obj;
  },{})
}
