const parseFiles = require('./parser');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

function compile(components, scenarios, out, debug) {
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
  const outputPath = out || './src/assets';
  fs.writeFileSync(`${outputPath}/scenarios.ts`, template);
  
  if (debug) {
    console.log(`Using output path: '${outputPath}'`);
  }
  
  console.log('✨  Build completed!');
}

module.exports = compile;