require('ts-node/register');
const program = require('commander');
const pkg = require('../package.json');
const compiler = require('./compiler');
const shell = require("shelljs");

program
  .version(pkg.version)
  .option('-c, --components [src]', 'Path to components')
  .option('-s, --scenarios [src]', 'Path to scenarios')
  .option('-o, --out [path]', 'Output path')
  .option('-d, --debug', 'Debug');

program
  .command('compile')
  .action(function(env, options) {
    compiler(program.components, 
             program.scenarios, 
             program.out, 
             program.debug);
  });

program
  .command('start')
  .action(function(env, options) {
    compiler(program.components, 
             program.scenarios, 
             program.out, 
             program.debug);
    shell.exec('npm run start');
  });
  
program.parse(process.argv);
