import Event from '../../Event.js';
export default  async function connect() {
  if(!this.state.isConnected && !this.state.isConnecting){
    this.state.isConnecting = true;

    await this.persistanceAdapter.connectAdapter(this);

    this.state.isConnected = true;
    this.state.isConnecting = false;
    this.emit(new Event('connected'));
  }
}
