module.exports = async function ensure(p, data = '') {
  const exist = await this.exists(p);
  if (!exist) {
    await this.create(p, data);
    return this.ensure(p, data);
  }
  return exist;
}
