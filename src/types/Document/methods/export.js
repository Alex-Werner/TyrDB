export default  function exportToJSON(){
  const {_id, _meta,_fields}= this;
  return {
    _id, _meta, _fields
  }
}
