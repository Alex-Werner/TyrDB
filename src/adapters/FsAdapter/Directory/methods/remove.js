const fs = require('fs');
module.exports = async function remove(p) {
  const files = await this.list(p);
  return new Promise((resolve,reject)=>{
    // If there is file, we remove them first
    Promise.all(files.map(async (file) => {
      try {
        const filep = path.join(p, file);
        fs.lstat(filep, (err,stat)=>{
          if (stat.isDirectory()) {
            fs.rmdir(filep, (err) => {
              if (err) rej(err);
              resolve(true);
            });
          } else {
            fs.unlink(filep, (err) => {
              if (err) rej(err);
              resolve(true);
            });
          }
        })

      } catch (err) {
        console.error(err);
      }
    })).then(()=>{
      fs.rmdir(p, (err) => {
        if (err) rej(err);
        resolve(true);
      });
    }).catch( (err)=> {
      console.error(err);
      reject(err);
    })
  });
}
