require('ts-node/register');
const program = require('commander');
const parseFiles = require('./parse');
const pkg = require('../package.json');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

program
  .version(pkg.version)
  .option('-c, --components [src]', 'Path to components')
  .option('-s, --scenarios [src]', 'Path to scenarios')
  .option('-o, --out [path]', 'Output path')
  .option('-d, --debug', 'Debug')
  .parse(process.argv);

console.log('🚀  Building scenarios...');

// Get the input path
const compPath = program.components || './src/*.ts';

// Parse the files
const compFiles = glob.sync(compPath);
const metas = parseFiles(compFiles);

if (program.debug) {
  console.log(`Using component path: '${compPath}'`);
  console.log('Using component files:', compFiles);
}

// Path to scenarios
const scenarioPath = program.scenarios || './scenarios/*.ts';
const scenarios = glob.sync(scenarioPath);

if (program.debug) {
  console.log(`Using scenario path: '${scenarioPath}'`);
  console.log('Using component files:', scenarios);
}

// Build the files
const requireTemplate = () => {
  const t = [];
  for (const p of scenarios) {
    t.push(`require('${path.relative(path.resolve('src/assets'), p)}');\n`);
  }
  return t.join('');
};

const template = 
`import 'reflect-metadata';\n
import { registerMetadata, scenarios } from '../../lib';\n
declare var require: any;\n
registerMetadata(${JSON.stringify(metas, null, 2)});\n
${requireTemplate()}
export { scenarios };\n`;

// Write to the output
const outputPath = program.out || './src/assets';
fs.writeFileSync(`${outputPath}/scenarios.ts`, template);

if (program.debug) {
  console.log(`Using output path: '${outputPath}'`);
}

// Display results
// console.log('Results', JSON.stringify(metas, null, 2));
console.log('✨  Build completed!');
