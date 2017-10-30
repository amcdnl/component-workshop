require('ts-node/register');
const program = require('commander');
const pkg = require('../package.json');
const generator = require('./generator');
const scaffold = require('./scaffold');
const shell = require("shelljs");

program
  .version(pkg.version)

program
  .command('compile')
  .option('-c, --components [src]', 'Path to components')
  .option('-s, --scenarios [src]', 'Path to scenarios')
  .option('-o, --out [path]', 'Output path')
  .option('-d, --debug', 'Debug')
  .action(function(env, options) {
    generator(program.components, 
              program.scenarios, 
              program.out, 
              program.debug);
  });

program
  .command('start')
  .option('-c, --components [src]', 'Path to components')
  .option('-s, --scenarios [src]', 'Path to scenarios')
  .option('-o, --out [path]', 'Output path')
  .option('-d, --debug', 'Debug')
  .action(function(env, options) {
    generator(program.components, 
              program.scenarios, 
              program.out, 
              program.debug);
    shell.exec('npm run start');
  });


program
  .command('init')
  .action(scaffold);
  
program.parse(process.argv);
