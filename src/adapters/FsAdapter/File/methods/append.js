const fs = require('fs');
module.exports = async function append(p) {
  return new Promise((res, rej) => {
    fs.appendFile(p, data, (err) => {
      if (err) rej(err);
      res(true);
    });
  });
}
