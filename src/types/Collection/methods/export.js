export default  function exportToJSON() {
  const {name, parentDatabaseName} = this;
  return {
    name, parentDatabaseName
  }
}
