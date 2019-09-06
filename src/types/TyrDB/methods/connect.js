const Event = require('../../Event');

module.exports = async function connect() {
  if(!this.state.isConnected && !this.state.isConnecting){
    this.state.isConnecting = true;

    console.log(this)
    await this.persistanceAdapter.connectAdapter(this);

    this.state.isConnected = true;
    this.state.isConnecting = false;
    this.emit(new Event('connected'));
  }
}
