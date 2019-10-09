const TyrDB = require('../index');
const {MemoryAdapter} = require('../adapters')
const users = require('./users');

const adapter = new MemoryAdapter();

const client = new TyrDB({adapter});

const dbName = 'tyrdb';
const colName = 'users';


async function start() {
  await client.connect();
  const db = await client.db(dbName);
  const col = await db.collection(colName)

  // Inserting a document
  await col.insert({
    "name": "Devan",
    "age": 38,
    "gender": "Male",
    "country": "Georgia",
    "_id": "5d6ebb7e21f1df6ff7482631"
  });

  // Inserting any document without a _id will generate it one
  const insertedDoc = await col.insert({
    "name": "Lilith",
    "age": 25,
    "gender": "Female",
    "country": "Armenia",
  });
  const insertedDocId = insertedDoc.results[0]._id;
  console.log("Inserted doc ", insertedDocId)

  // Inserting in bulk is also possible.

  await col.insert([
    users.Anastasia,
    users.Alice,
    users.Alex,
    users.Bob,
    users.Chen,
    users.Jean,
    users.Julian,
    users.Lucy,
    users.Pascal,
    users.Taneti,
    users.Brigitte
  ])


  console.log(`Searching Bob`)
  console.log(await col.find({name:'Bob'}));

  console.log(`\n Searching age >=45`)
  console.log(await col.find({age: {$gte: 45}}));

  console.log(`\n Searching age <45`)
  console.log(await col.find({age: {$lt: 45}}));

  console.log(`\n Searching country ['US', 'China']`)
  console.log(await col.find({country: {$in: ['United States', 'China']}}));

  console.log('\n Female between 18 and 40 in France');
  console.log(await col.find({country: {$in: ['France']}, age:{$lt:40, $gte:18}, gender:"Female"}));
  // const res = (await col.find({age:{$gt:38, $lt:45}}));
  // console.log(res)
  console.log(`\n Getting document by id`);
  console.log(await col.get(insertedDocId));

  console.log('\n Removing document')
  console.log(await col.remove({name:'Bob'}));
  console.log(await col.find({name:'Bob'}));


  await client.close();
}

client.on('ready', start);


