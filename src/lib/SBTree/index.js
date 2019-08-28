const Document = require('../../types/Document/Document');
const SBTree = require('./SBTree');
const tree = new SBTree();

const document = new Document({name:'Alex', age:23})
tree.insert(document)
console.log(tree)
