## API


# Create Collection

```
async function createCol(){
 const db = client.db('myDb');
 const users = db.collection('users');
 client.close();
}
start();
```

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

