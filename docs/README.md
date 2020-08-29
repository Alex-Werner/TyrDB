## TyrDB


[![NPM Version](https://img.shields.io/npm/v/tyrdb.svg?&style=flat-square)](https://www.npmjs.org/package/tyrdb)
[![Build Status](https://img.shields.io/github/workflow/status/alex-werner/tyrdb/Node.js%20CI)](https://github.com/Alex-Werner/TyrDB/actions)
[![Release Date](https://img.shields.io/github/release-date/alex-werner/tyrdb)](https://github.com/alex-werner/tyrdb/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

> Fast in-memory database for node and browser that is portable and easy to use

The goal of TyrDB is to provide a fast, easy and instant to use database.   
It aims at getting close to the performance and features you could find in your modern NoSQL DB solutions.   
For that, a subset of the Mongo query syntax is being used, so the production switch from TyrDB dev env to MongoDB would be as fast as possible.    

TyrDB is intended for bootstrapping project or small backend servers.    
Due to the use of a modified B+Tree system, performance stays at service without the need to load everything in memory as you can encounter with many Node DB out-there.   

N.B : Fields are indexed by default. Specifically exclude field that might be too lengthy as otherwise might have heavy performance effect (see more on BTree to understand).  
Uniques field are also available.   
TyrDB relies on [SBTree](https://github.com/Alex-Werner/SBTree) as it's main dependencies for data.  


## Install

## Browser 

```html
<script src="https://unpkg.com/tyrdb"></script>
```

## Node

In order to use this library, you will need to add our [NPM package](https://www.npmjs.com/dash) to your project.

Having [NodeJS](https://nodejs.org/) installed, just type :

```bash
npm install tyrdb
```
