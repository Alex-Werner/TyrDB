// const reduce = require("lodash.reduce");
import reduce from 'lodash.reduce';
export default function cleanPrivateProps(props){
  return reduce(props,(obj, prop, propName)=>{
    if(propName[0]!=='_') obj[propName]=prop;
    return obj;
  },{})
}
