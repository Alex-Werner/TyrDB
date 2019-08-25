module.exports = class StoreAdapter {
  constructor(props){
    this.isConnected = false;
    this.isSync = false;
  }
  connectAdapter(){
    throw new Error('Not implemented')
  }
  createDatabase(){
    throw new Error('Not implemented')
  }
  syncDatabase(){
    throw new Error('Not implemented')
  }
  deleteDatabase(){
    throw new Error('Not implemented')
  }
  exportDatabase(){
    throw new Error('Not implemented')
  }
  findDatabase(){
    throw new Error('Not implemented')
  }
  findOrCreateDatabase(){
    throw new Error('Not implemented')

  }
}
