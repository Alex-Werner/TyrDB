module.exports = function exportToJSON() {
  const {name, parentDatabaseName} = this;
  return {
    name, parentDatabaseName
  }
}
