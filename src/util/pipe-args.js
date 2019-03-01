'use strict';

const { readSync: read } = require('fs');
const { constants: { MAX_LENGTH, MAX_STRING_LENGTH } } = require('buffer');

const DFLT_OPTIONS = {
  unsafe: false,
  bufferSize: 65535,
  encoding: 'utf8',
  includeArgv: true
}

/**
 * Provides the callback function with the complete process.argv, appending
 * piped data if exists.
 * 
 * If opts.unsafe == 'fill', an unsafe buffer filled with 0s will be used.
 *
 * @param {function} [cb] The callback function
 * @param {object} [opts] Additional options
 * @param {boolean | 'fill'} [opts.unsafe=false] Use unsafe buffer allocation
 * @param {number} [opts.bufferSize=65535] Buffer allocation size
 * @param {string} [opts.encoding=utf8] Character encoding to use
 * @param {boolean} [opts.includeArgv=true] Include process.argv in the returned value
 * @returns {*} The result of the callback function or the piped data if the callback is not a function
 */
module.exports = function(cb, opts) {
  if (process.stdin.isTTY)
    return typeof cb === 'function' ? cb(process.argv) : undefined;
  opts = Object.assign(DFLT_OPTIONS, typeof cb === 'object' && opts === undefined ? cb : opts);

  let bytesRead = 0;
  let chunks = [];
  let buffer = Buffer[opts.unsafe ? 'allocUnsafe' : 'alloc'](opts.bufferSize);;
  if (opts.unsafe === 'fill') buffer.fill(0);

  do {
    try {
      bytesRead = read(0, buffer, 0, opts.bufferSize, null);
    } catch (e) {
      if (e.code != 'EAGAIN') throw e;
    }

    if (bytesRead > 0)
      chunks.push(buffer.toString(opts.encoding, 0, bytesRead));
  } while (bytesRead > 0);

  if (opts.includeArgv) chunks = [].concat(process.argv, chunks);
  
  return typeof cb === 'function' ? cb(chunks) : chunks;
}