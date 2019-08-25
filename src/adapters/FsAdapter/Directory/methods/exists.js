const fs = require('fs');
module.exports = async function exists(p) {
  return new Promise((resolve, reject) => {
    fs.stat(p, (err, stats) => {
      if (err && err.code === 'ENOENT') {
        return resolve(false);
      } if (err) {
        return reject(err);
      }
      if (stats.isFile() || stats.isDirectory()) {
        return resolve(true);
      }
      return false;
    });
  });
}
