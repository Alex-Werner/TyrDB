export default  function serializeMeta() {
  const {options, state, databases, databaseVersion} = this;

  const adapter = this.persistanceAdapter.serializeMeta();
  const parentDatabaseName = this.parentDatabaseName;

  const meta = {options, state, adapter,databases, databaseVersion, parentDatabaseName};

  return JSON.stringify(meta);
}
