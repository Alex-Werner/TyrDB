import Event from '../../Event.js';
export default  async function close() {
    if(this.state.isConnected){
        await this.persistanceAdapter.disconnectAdapter(this);

        this.state.isConnected = false;
        this.state.isConnecting = false;
        this.emit(new Event('closed'));
    }
}
