# TyrDB

[![NPM Version](https://img.shields.io/npm/v/tyrdb.svg?&style=flat-square)](https://www.npmjs.org/package/tyrdb)
[![Build Status](https://api.travis-ci.org/Alex-Werner/TyrDB.svg?branch=master)](https://travis-ci.com/Alex-Werner/TyrDB)

> Fast in-memory database for node and browser that is portable and easy to use

The goal of TyrDB is to provide a fast, easy and instant to use database for your prototype project.   
It aims at getting close to the performance and features you could find in your modern NoSQL DB solutions.   
For that, a subset of the Mongo query syntax is being used, so the production switch from TyrDB dev env to MongoDB will be as fast as possible.    

TyrDB is intended for bootstraping project or small servers.    
Due to the use of a modified B+Tree system, performance stays at service without the need to load everything in memory as you can encounter with many Node DB out-there.   

Due to the early state of this repository, one should be careful with what they use this for.  

TyrDB provide you an immediate database that you can use and with data file you can git for your dev cycles.    

Adapters available for In-Memory and FS store.   
 
N.B : Fields are indexed by default. Specifically exclude field that might be too lengthy as otherwise might have heavy performance effect (see more on BTree to understand).  
Uniques field are also available.   

### Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
 - [Documentation](#documentation)
    - [API](/doc/api.md)
    - [Events](/doc/events.md)
    - [Queries](/doc/queries.md)
 - [Metadata Info](#documents-metadata)
 - [Adapters](#adapters)
 - [FAQ](#faq)
 - [TODO](/doc/todo.md)
 
## Installation 

`npm install tyrdb`

## Usage

```$xslt
mkdir myproject
cd myproject
npm init
npm install tyrdb
touch index.js
```

And there just use that snipets to start playing ! : 

```js
const TyrDB = require('tyrdb');
const {MemoryAdapter} = require('tyrdb/adapters')

const adapter = new MemoryAdapter();
const client = new TyrDB({adapter});

async function start(){
 await client.connect();
 console.log('In sync with the adapter/server');
 const db = await client.db('myproject');
 const col = await db.collection('users');
 const insertedDoc = await col.find({age:33});
 await client.close();
}
start();
```

Alternatively, you might prefer to wait for the DB to be ready (as it will autoconnect by default)

```js
const TyrDB = require('tyrdb');
const {MemoryAdapter} = require('tyrdb/adapters')

const adapter = new MemoryAdapter();
const client = new TyrDB({adapter});
const dbName = 'myproject';

function start(){
 const db = client.db(dbName);
 client.close();
}
db.on('ready',start);
```

## Documentation 

- [API](/doc/api.md)
- [Events](/doc/events.md)
- [Queries](/doc/queries.md)

## Documents Metadata

- Document have an _id by default, the format is 1-to-1 with the specification of [MongoDB ObjectID](https://docs.mongodb.com/manual/reference/method/ObjectId/)
- They also have a _meta which hold the current version of the file and it's creation date.


## Adapters 

- `MemoryAdapter` : Default adapter. Set Store inMemory. Limited by heap memory available (good enough).

```js
const {MemoryAdapter} = require('tyrdb/adapters')
const adapter = new MemoryAdapter();
const client = new TyrDB({adapter});
```

- `FsAdapter` : FileSystem adapter. 
Default path will be `.db`. Path and options should be passed in TyrDB constructor. 

Storage will be optimized therefore not planned to be easily browsable or openable (big files).
Each collection have a set of `.dat` and `.meta.json` file. Keep both are meta is needed to find the data in the data file :).
 
```js
const {FsAdapter} = require('tyrdb/adapters')
const adapter = new MemoryAdapter();
const client = new TyrDB({path:'.db/mydbpath',adapter});
```

- `IndexedAdapter` : Persist in web browser indexed db storage : TODO
- `LocalStorageAdapter` : Persist in web browser local storage : TODO

## FAQ : 
#### Q : Is it a definitive API ? 

Any move we might take will be in the direction of matching more carefully the mongo syntax. So you should be good on that.  
No promises, I tend to love breaking things to move on.  

#### Q : Why another one ? 

The in-memory things. It's annoying, I need to be able to have as much as big documents as I would love without hitting that much the performance. 
So it uses a B+Tree modified architecture for storing. You can see the dependency here [SBTree](https://github.com/Alex-Werner/SBTree).

#### Q : Any drowback of this library ? 

Right now, you are limited in the abilities of querying as we only support ($eq, $neq, $lt, $lte, $gt, $gte, $in, $nin), there is not yet all the fancyness from the MongoDB or anything yet (especially $regex).  
It also might never come, dependings of if I need them myself or have extra time and demands for it, so mind opening an issue if it is your case in the SBTree repository :).  
So for now, yes : You can just insert and find.   

Also, if your document has it's own `_id` value, then it should be a valid mongodb ObjectId value. Post an issue if that is colliding with your own data, we can change it.   
Finally, there is no support yet in SBTree for nested document. We then only support 1-level documents.

#### Q : Difference between .serialize() and .export()

TyrDB by default do not hold any data, only refs and indexes. Data are handled by adapters.
Therefore every element is caracterized by it's own metadata and data. 
`.export()` fetches the metadata elements.
`.serialize()` the json representation of the elements.

#### Q : How much work is needed to switch to mongodb afterwards : 

TL;DR : Very few, especially by creating an adapter in TyrDB that would override uses of SBTree for a Mongoose or similar interface.   
TODO : Feature  
TODO STEP BY STEP.  

#### Q : Why the name

A mix between my own interest for naming with nordic gods (or gods in general) many of my softwares, and due to LokiDB existing with similar purpose (with limitation that weren't suiting my needs). Therefore TyrDB.

### Q : Links ?

- [TODO](/TODO.md)
