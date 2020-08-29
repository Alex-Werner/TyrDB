async function disconnectAdapter(){
  await this.queue.stop();

}
module.exports = disconnectAdapter
