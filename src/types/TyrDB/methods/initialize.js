const Event = require('../../Event')
module.exports = async function initialize() {
  if (this.options.autoConnect) {
    await this.connect()
  }
  this.emit(new Event('initialized'));
}
