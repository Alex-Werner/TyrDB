class NotImplementedError extends Error {
  constructor(feature = 'unspecified') {
    super(`Not implemented feature : ${feature}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
module.exports = NotImplementedError
