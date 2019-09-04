# TyrDB

[![NPM Version](https://img.shields.io/npm/v/tyrdb.svg?&style=flat-square)](https://www.npmjs.org/package/tyrdb)
[![Build Status](https://api.travis-ci.org/Alex-Werner/tyrdb)](https://travis-ci.com/Alex-Werner/tyrdb)

> Fast in-memory database for node and browser that is portable and easy to use

The goal of TyrDB is to a database that is fast and easy to work with while still match the performances and features of modern databases.   

It uses for that the Mongo query syntax so that any switch from TyrDB in dev and Mongo in production is easy and fast to perform.  

Indeed, TyrDB is mostly intended for bootstraping project or small servers mostly due to the early state of this repository. 
But due to the use of a modified B+Tree system, performance are here without the need to load everything in memory as you can encounter with many Node DB out-there.

TyrDB provide you an immediate database that you can use and with data file you can git for your dev cycles.   

Adapters available for In-Memory and FS store.   
 
### Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
 - [Documentation](#documentation)
     - [Events](/doc/events.md)
    - [API](/doc/api.md)
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

- [Events](/doc/events.md)
- [API](/doc/api.md)

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
 
Use FsSemanticAdapter if you need to have file easily browsable.  

```js
const {FsAdapter} = require('tyrdb/adapters')
const adapter = new MemoryAdapter();
const client = new TyrDB({path:'.db/mydbpath',adapter});
```

- `FsSemanticAdapter` : Similar to `FsAdapter` but with semantic file system architecture (Good for prototyping).
Instead of trying to limit file, and optimize how we read in a big file. We just have one `.json` file per Document. 


```js
const {FsSemanticAdapter} = require('tyrdb/adapters')
const adapter = new MemoryAdapter();
const client = new TyrDB({path:'.db/mydbpath',adapter});
```

- `IndexedAdapter` : Persist in web browser indexed db storage
- `LocalStorageAdapter` : Persist in web browser local storage

## FAQ : 
#### Is it a definitive API ? 

Any move we might take will be in the direction of matching more carefully the mongo syntax. So you should be good on that.  
No promises, I tend to love breaking things to move on.  

#### Why another one ? 

The in-memory things. It's annoying, I need to be able to have as much as big documents as I would love without hitting that much the performance. 
So it uses a B+Tree modified architecture for storing. You can see the dependency here [SBTree](https://github.com/Alex-Werner/SBTree).

#### Any drowback of this library ? 

Right now, we just know how to find on strict equality, but there is no fancyness from the MongoDB or anything. It also might never come, dependings of if I need them myself or have extra time. 
So for now, yes : You can just insert and find.   
Also, if your document has it's own `_id` value, then it should be a valid mongodb ObjectId value. Post an issue if that is colliding with your own data, we can change it.   
Finally, there is no support yet in SBTree for nested document. We then only support 1-level documents.

#### Difference between .serialize() and .export()

TyrDB by default do not hold any data, only refs and indexes. Data are handled by adapters.
Therefore every element is caracterized by it's own metadata and data. 
`.export()` fetches the metadata elements.
`.serialize()` the json representation of the elements.

#### How much work is needed to switch to mongodb afterwards : 

TODO.

#### Why the name

A mix between my own interest for naming with nordic gods (or gods in general) many of my softwares, and due to LokiDB existing with similar purpose (with limitation that weren't suiting my needs). Therefore TyrDB.
