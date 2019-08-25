const fs = require('fs');
module.exports = async function list(p = '') {
  return new Promise((resolve, reject) => {
    fs.readdir(p, (err, list) => {
      if (err && err.code === 'ENOENT') {
        return reject(err);
      } if (err) {
        return reject(err);
      }
      return resolve(list);
    });
  });
}
