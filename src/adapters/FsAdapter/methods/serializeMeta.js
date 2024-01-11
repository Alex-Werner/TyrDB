function serializeMeta(){
  const name = this.constructor.name;
  return (this.options) ? {name,options:this.options} : {name};
};
export default  serializeMeta
