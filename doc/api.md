## API


# Create Collection

```
async function createCol(opts={}){
 const db = client.db('myDb');
 const users = db.collection('users');
 client.close();
}
start();
```

Options : 

  - `adapter` Adapter - (def: MemoryAdapter) : Allow to specific another adapter to use
  - `order` Number - (def: 511) : Primordial for the performance, the closest to L1 the better. Chose below 2^n. 
  - `verbose` Bool - (def: false)
  - `uniques` Array - (def: []) - Allow to set some field unique by adding them to this array
  - `exclude` Array - (def: []) - Allow to exclude from indexing some field (important if you expect field value to be huge or nested).

- uniques 

# Insert documents

```
async function insertUser(){
 const user = {name:"Obusco", age:28};
 const users = db.collection('users');
 users.insert(user);
 client.close();
}
start();
```
# Find documents

```
async function insertUser(){
 const users = db.collection('users');
 const user = await users.find({name:"Obusco"});
 client.close();
}
start();
```

See more on the valid [Queries](/doc/queries.md)

# Update document

```
async function insertUser(){
 const users = db.collection('users');
 const user = await users.find({name:"Obusco"});
 
 // Way 1
 await user.update({age:29});
 
 // Similar to Mongodb 
 await users.updateOne({name:"Obusco"});

 client.close();
}
start();
```

# Remove document

```
async function insertUser(){
 const users = db.collection('users');
 const user = await users.find({name:"Obusco"});
 
 // Way 1
 await user.remove();
 
 // Similar to Mongodb 
 await users.deleteOne({name:"Obusco"});

 client.close();
}
start();
```

