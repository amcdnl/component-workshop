const parseFiles = require('./parser');
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

function generator(components, scenarios, out, debug) {
  console.log('🚀  Building scenarios...');
  
  // Get the input path
  const compPath = components || './src/*.ts';
  
  // Parse the files
  const compFiles = glob.sync(compPath);
  const metas = parseFiles(compFiles);
  
  if (debug) {
    console.log(`Using component path: '${compPath}'`);
    console.log('Using component files:', compFiles);
  }
  
  // Path to scenarios
  const scenarioPath = scenarios || './scenarios/*.ts';
  const scenarios = glob.sync(scenarioPath);
  
  if (debug) {
    console.log(`Using scenario path: '${scenarioPath}'`);
    console.log('Using component files:', scenarios);
  }
  
  // Build the files
  const requireTemplate = () => {
    const t = [];
    for (const p of scenarios) {
      t.push(`require('${path.relative(path.resolve('./dist-cw'), p)}');\n`);
    }
    return t.join('');
  };
  
  const outputPath = out || './dist-cw';
  const libPath = path.relative(path.resolve(outputPath), './lib');
  const template = 
`import 'reflect-metadata';\n
import { registerMetadata, scenarios } from '${libPath}';\n
declare var require: any;\n
registerMetadata(${JSON.stringify(metas, null, 2)});\n
${requireTemplate()}
export { scenarios };\n`;
  
  // Write to the output
  fs.ensureDirSync(outputPath);
  fs.writeFileSync(`${outputPath}/scenarios.ts`, template);
  
  if (debug) {
    console.log(`Using output path: '${outputPath}'`);
  }
  
  console.log('✨  Build completed!');
}

module.exports = generator;