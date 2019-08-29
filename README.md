# TyrDB

[![NPM Version](https://img.shields.io/npm/v/tyrdb.svg?&style=flat-square)](https://www.npmjs.org/package/tyrdb)
[![Build Status](https://img.shields.io/travis/com/tyrdb.svg?branch=master&style=flat-square)](https://travis-ci.com/Alex-Werner/tyrdb)

> Fast in-memory database for node and browser that is portable and easy to use

Goal is to provide a MemoryAdapter and a FsAdapter with an API very similar to node-mongodb-native.   
We would be able to quickly add a real mongodb adapter after wards.  

Usage is of TyrDB is mostly intended for bootstraping project or small servers however we used a modified B+Tree system, which should fit real usage needs.  
The change in B+tree allow us to NOT have to load everything on local memory, therefore you should not see any issue that you encounter with typical ready/easy to use DB out-there. 

The logic is to provide you everything to do stuff with a DB, without any install / config, in a way that will allow you to easily switch to a real mongoDB adapter during the pre-production (thus the similar verbing of methods). 

 
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
const dbName = 'myproject';

async function start(){
 await client.connect();
 console.log('In sync with the adapter/server');
 const db = client.db(dbName);
 client.close();
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

Glad I asked that myself so I can warn you : Nope, I'm not yet sure on the internals, as there is some data handled by the adapters while we handle the metadata.
On top of that, we want to perform ops with sometimes data on file. Basically : I will be careful, but it might change. 

#### Is it just a big in-memory things ? 

Well, actually no. If you use MemoryAdapter, you will have a full local store. But when using FS, the whole logic is to save in JSON file.  
We just hold locally some meta information (because we will need to lookup for the file).   
The whole problem is on how to find an information without parsing EVERY file out there.  
That is why each field of a document gets to be a meta, with their own local B+Tree.  

#### Any drowback of this library ? 

Right now, we just know how to find, but there is no fancyness from the MongoDB or anything. It also might never come, dependings of if I need them myself or have extra time. 
So for now, yes : You can just insert and find.   
Also, if your document has it's own `_id` value, then it should be a valid mongodb ObjectId value. Post an issue if that is colliding with your own data, we can change it.   

#### Difference between .serialize() and .export()

TyrDB by default do not hold any data, only refs and indexes. Data are handled by adapters.
Therefore every element is caracterized by it's own metadata and data. 
`.export()` fetches the metadata elements.
`.serialize()` the json representation of the elements.

#### How much work is needed to switch to mongodb afterwards : 

TODO.

#### Why TyrDB

A mix between my own interest for naming with nordic gods (or gods in general) many of my softwares, and due to LokiDB existing with similar purpose (with limitation that weren't suiting my needs). Therefore TyrDB.
