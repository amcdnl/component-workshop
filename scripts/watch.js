const path = require('path');
const watch = require('node-watch');

function watcher(components, scenarios, cb) {
  console.log('Watch Started');
  
  const compPath = components || './src/*.ts';
  const scenarioPath = scenarios || './scenarios/*.ts';
  
  watch([
    path.resolve(compPath),
    path.resolve(scenarioPath)
  ], () => {
    console.log('Watch triggered');
    cb();
  });
}
