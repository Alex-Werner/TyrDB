// const crypto = require('crypto');
import crypto from 'crypto';
function hash(alg, data) {
  return crypto.createHash(alg).update(data).digest();
}

function sha256(data) {
  return hash('sha256', data);
}

function doubleSha256(data) {
  return sha256(sha256(data));
}
function insecureRandomBytes(size) {
  const result = new Uint8Array(size);
  for (let i = 0; i < size; ++i) result[i] = Math.floor(Math.random() * 256);
  return result;
}
function getRandomBytes(){
  let randomBytes = null;
  try {
    randomBytes = crypto.randomBytes;
  } catch (e) {
    // keep the fallback
  }
  if (randomBytes == null) {
    randomBytes = insecureRandomBytes;
  }
  return randomBytes;
}
function browserRandomBytes(){
  let randomBytes = size => window.crypto.getRandomValues(new Uint8Array(size));
  return randomBytes;
}
const isWindowContext = (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues);

export default  {
  hash,
  insecureRandomBytes,
  doubleSha256,
  sha256,
  randomBytes:(isWindowContext)? browserRandomBytes : getRandomBytes()
};
