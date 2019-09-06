const TyrDB = require('../index');
const {MemoryAdapter} = require('../adapters')

const adapter = new MemoryAdapter();

const client = new TyrDB({adapter});

const dbName = 'tyrdb';
const colName = 'users';




async function start(){
  await client.connect();
  const db = await client.db(dbName);
  const col = await db.collection(colName)

  await col.insert({
    "name": "Devan",
    "age":38,
    "email": "Devan@Prohaska.com",
    "_id": "5d6ebb7e21f1df6ff7482631"
  });

  console.log(await col.find({age:{$gte:38}}))
  // console.log(client.serializeMeta());
  await client.close();
  return;

  console.log('find')
  console.log(await col.find({name:'Devan'}));
  console.log('get')
  console.log(await col.get('5d6ebb7e21f1df6ff7482631'));


}
client.on('ready',start);


