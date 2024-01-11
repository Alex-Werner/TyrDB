import collection from './methods/collection.js';
import list from './methods/list.js';
import exportFn from './methods/export.js';
const defaultProps = {
  name: 'default_db'
}
class Database {
  #adapter;
  #tyrInstance;
  constructor(props = {}){
    this.name = (props.name) ? props.name : defaultProps.name;
    this.#adapter = props.adapter;
    this.#tyrInstance = props.tyrInstance;
  }
  getAdapter(){
    return this.#adapter;
  }
  getTyrInstance(){
    return this.#tyrInstance;
  }
}
Database.prototype.collection = collection;
Database.prototype.list = list;
Database.prototype.export = exportFn;
export default  Database;
