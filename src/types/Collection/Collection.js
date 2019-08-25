const defaultProps = {
  name: 'default_col'
}
class Collection {
  #adapter;
  #tyrInstance;
  constructor(props) {
    this.name = (props.name) ? props.name : defaultProps.name;
    this.#adapter = props.adapter;
    this.#tyrInstance = props.tyrInstance;
    this.parentDatabaseName = (props.parentDatabaseName)
  }
  getAdapter(){
    return this.#adapter;
  }
  getTyrInstance(){
    return this.#tyrInstance;
  }
};
Collection.prototype.find = require('./methods/find')
Collection.prototype.insert = require('./methods/insert')
Collection.prototype.insertMany = require('./methods/insertMany')
Collection.prototype.insertOne = require('./methods/insertOne')
module.exports = Collection;
