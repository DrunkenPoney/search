'use strict';

const fs = require('fs');
const exists = fs.existsSync;
const getOpts = options => Object.assign({ encoding: 'utf8' }, typeof options === 'string' ? { encoding: options } : options);

module.exports = {
    exists,
    isDir: (path) => exists(path) && fs.lstat(path).isDirectory(),
    readFile: (path, options) => new Promise((res, rej) => fs.readFile(path, getOpts(options), (err, data) => err ? rej(err) : res(data))),
    writeFile: (path, options) => new Promise((res, rej) => fs.writeFile(path, getOpts(options), (err, data) => err ? rej(err) : res(data)))
}