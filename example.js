const TyrDB = require('tyrdb');
const {MemoryAdapter} = require('./adapters')

const adapter = new MemoryAdapter();

const client = new TyrDB({adapter});


