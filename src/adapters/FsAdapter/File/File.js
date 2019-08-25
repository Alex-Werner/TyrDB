const File = {};
File.append = require('./methods/append').bind(File);
File.create = require('./methods/create').bind(File);
File.exists = require('./methods/exists').bind(File);
File.ensure = require('./methods/ensure').bind(File);
File.read = require('./methods/read').bind(File);
File.remove = require('./methods/remove').bind(File);
module.exports = File;
