
async function list(){
  const instance = this.getTyrInstance();
  if (!instance.databases[this.name]) {
    throw new Error('Invalid database')
  }
  return Object.keys(instance.databases[this.name].collections);
};
export default  list;
