import Event from '../../Event.js';

export default async function initialize() {
  if (this.options.autoConnect) {
    await this.connect();
  }
  this.emit(new Event('initialized'));
}
