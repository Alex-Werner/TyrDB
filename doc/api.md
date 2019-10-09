## API

# TyrDB

```js
const client = new TyrDB([opts]);
```
- Constructor options :
  - `adapter` Adapter - (def: MemoryAdapter()) : Allow to specific another adapter to use
  - `autoInitialize` Adapter - (def: true) : If true, will auto init the db
  - `autoConnect` Adapter - (def: true) : If true, will auto connect the db
  - `path` Adapter - (def: '.db') : Desired relative path to persist the data

# Close connection 

```js
 await client.close();
```

# Create Database

```js
  const db = await client.db('myDb');
```

# Create Collection

```js
const db = await client.db('myDb');
const opts = {};
const users = await db.collection('users', opts);
```

Options : 

  - `order` Number - (def: 511) : Primordial for the performance, the closest to L1 the better. Chose below 2^n. 
  - `uniques` Array - (def: []) - Allow to set some field unique by adding them to this array
  - `exclude` Array - (def: []) - Allow to exclude from indexing some field (important if you expect field value to be huge or nested).

# Insert documents

```
async function insertUser(){
 const user = {name:"Obusco", age:28};
 const users = await db.collection('users');
 await users.insert(user);
 client.close();
}
start();
```
# Find documents

```
async function insertUser(){
 const users = await db.collection('users');
 const user = await users.find({name:"Obusco"});
 client.close();
}
start();
```

See more on the valid [Queries](/doc/queries.md)

# Remove document

```
async function insertUser(){
 const users = await db.collection('users');
 await users.remove({name:"Obusco"});
 
 client.close();
}
start();
```

