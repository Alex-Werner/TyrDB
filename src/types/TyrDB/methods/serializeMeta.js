module.exports = function serializeMeta() {
  const {options, state, databases, databaseVersion} = this;

  const adapter = this.persistanceAdapter.serializeMeta();
  const meta = {options, state, adapter,databases, databaseVersion, adapter};

  return JSON.stringify(meta);
}
