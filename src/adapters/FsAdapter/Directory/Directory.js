const Directory = {};
Directory.create = require('./methods/create').bind(Directory);
Directory.exists = require('./methods/exists').bind(Directory);
Directory.ensure = require('./methods/ensure').bind(Directory);
Directory.list = require('./methods/list').bind(Directory);
Directory.remove = require('./methods/remove').bind(Directory);
module.exports = Directory;
