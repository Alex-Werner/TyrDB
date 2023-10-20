module.exports = function findOne(selector = {}, opts = {}) {
  return this.find(selector, opts)[0] || null;
};
