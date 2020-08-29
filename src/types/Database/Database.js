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
Database.prototype.collection = require('./methods/collection')
Database.prototype.list = require('./methods/list')
Database.prototype.export = require('./methods/export')
module.exports = Database;
