const fs = require('fs');

module.exports = async function read(p, options = {}) {
  const isFile = await this.exists(p);
  if (!isFile) throw new Error(`CannotReadFileNotFound({path: ${p}}`);
  return new Promise(async (res, rej) => {
    let output;
    // const lock = await slocket(p);
    try{
      const data = fs.readFileSync(p, options);
      // lock.release();

      if (Buffer.isBuffer(data)) output = data.toString('utf8');
      output = output.replace(/^\uFEFF/, '');
      let obj;
      try {
        obj = JSON.parse(output, options ? options.reviver : null);
      } catch (err2) {
        rej(err2);
      }
      res(obj);
    }catch (e) {
      rej(e);
    }
  });
}
