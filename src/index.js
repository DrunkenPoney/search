'use strict';


const pipe = require('./util/pipe-args');
pipe(result => console.log(result.reduce((i, j) => i + j.length, 0)));

// const prompts = require('prompts');
// const program = require('commander')
//     .version(require('../package.json').version)
//     .usage('search [options] ')
//     .option('-v, --verbose', 'Enable verbose output.')
//     .option('-i, --interactive', 'Enable interactive prompt')
//     .option('-r, --regex', 'Search by regular expression');

// program.command('replace'); // TODO <<


// require('cli-pipe')(program.parse);