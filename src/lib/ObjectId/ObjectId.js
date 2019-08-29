const is = require('../../utils/is');
const {randomBytes} = require('../../utils/crypto');
const util = require('util');

/**
 * ObectID are 12-bytes values consisting of
 * - 4 bytes representing sec from epoch (UNIX)
 * - 5 bytes representing a random value
 * - 3 bytes counter, with a random starting value.
 */
const UNIQUE_VALUE = randomBytes(5);
const validate = (input) => {
  if (!is.hex) {
    throw new Error('Expected a hex input to valid')
  }
  if (input.length !== 24) {
    throw new Error('Expected a hex input to 12 bytes long')
  }
  const secFromEpoch = parseInt(input.slice(0, 8).toString(), 16) * 1000;
  if (new Date(secFromEpoch).toString() === 'Invalid Date') {
    throw new Error('Expected hex input to be valid. Invalid date bytes');
  }
  return true;
};
const generateTimeBuffer = (time) => {
  const buffer = Buffer.alloc(4);
  buffer[3] = time & 0xff;
  buffer[2] = (time >> 8) & 0xff;
  buffer[1] = (time >> 16) & 0xff;
  buffer[0] = (time >> 24) & 0xff;
  return buffer;
}
const generateUniqueBuffer = () => {
  const buffer = Buffer.alloc(5);
  buffer[0] = UNIQUE_VALUE[0]
  buffer[1] = UNIQUE_VALUE[1]
  buffer[2] = UNIQUE_VALUE[2]
  buffer[3] = UNIQUE_VALUE[3]
  buffer[4] = UNIQUE_VALUE[4]
  return buffer;
}

class ObjectId {
  #hex;
  #increment = ~~(Math.random() * 0xffffff);

  #generateCounterValue = function () {
    const inc = this.#increment = (this.#increment = (this.#increment + 1) % 0xffffff);
    const buffer = Buffer.alloc(3);
    buffer[0] = inc & 0xff;
    buffer[1] = (inc >> 8) & 0xff;
    buffer[2] = (inc >> 16) & 0xff;
    return buffer;
  }

  fromHex(hex) {
    if (!validate(hex)) {
      throw new Error('Invalid input');
    }
    this.#hex = hex;
  }

  constructor(prop) {
    const time = ((typeof prop === 'number') ? prop : ~~(Date.now() / 1000));
    const hex = (typeof prop === 'string' && prop.length === 24) ? prop : null;
    if (hex) {
      this.fromHex(hex);
    } else {
      const timeBuffer = generateTimeBuffer(time);
      const uniqueValueBuffer = generateUniqueBuffer();
      const counterValueBuffer = this.#generateCounterValue();
      const buffer = Buffer.concat([timeBuffer, uniqueValueBuffer, counterValueBuffer]);
      this.fromHex(buffer.toString('hex'))
    }
  }
  toString() {
    return this.#hex;
  }
  isValid() {
    let isValid = false;
    try {
      return validate(this.#hex)
    } catch (e) {
      console.error(e);
      return isValid;
    }
  }
};
const inspect = (Symbol && Symbol.for('nodejs.util.inspect.custom')) || 'inspect';
ObjectId.prototype[inspect] = function() { return "ObjectID("+this.toString()+")" };

module.exports = ObjectId;
