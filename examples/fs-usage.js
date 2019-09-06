const TyrDB = require('../index');
const {FsAdapter} = require('../adapters')

const adapter = new FsAdapter();

const client = new TyrDB({adapter});

const dbName = 'tyrdb';
const colName = 'users';

async function start(){

  const db = await client.db(dbName);
  const col = await db.collection(colName)

  console.log(await col.find({name:'Devan'}));

  return;

  //
  await col.insert({
    "name": "Devan",
    "email": "Devan@Prohaska.com",
    "_id": "5d6ebb7e21f1df6ff7482631"
  });

  console.log(client.databases.tyrdb)
  console.log(await col.find({name:'Devan'}));

  // console.log(client.serializeMeta());
  // await client.close();
  return;

  console.log('find')
  console.log(await col.find({name:'Devan'}));
  console.log('get')
  console.log(await col.get('5d6ebb7e21f1df6ff7482631'));


}
client.on('ready',start);


