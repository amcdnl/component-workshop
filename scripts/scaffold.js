const path = require('path');
const fs = require('fs-extra');

const appTemplate = {
  "name": "component-workshop",
  "root": "src",
  "outDir": "dist-cw",
  "assets": [
    "assets",
    "favicon.ico"
  ],
  "index": "index.html",
  "main": "main.cw.ts",
  "polyfills": "polyfills.ts",
  "tsconfig": "tsconfig.app.json",
  "environmentSource": "environments/environment.ts",
  "environments": {
    "dev": "environments/environment.ts",
    "prod": "environments/environment.prod.ts"
  }
};

const template = `
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WorkshopModule } from 'component-workshop';
import './dist-cw/scenarios';
platformBrowserDynamic().bootstrapModule(WorkshopModule);
`;

function scaffold(env, options) {
  const configPath = path.resolve('./.angular-cli.json');
  const configSrc = fs.readFileSync(configPath, 'utf-8');
  const config = JSON.parse(configSrc);
  config.apps.push(appTemplate);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('✨ Updated Angular CLI Config file');

  const distPath = path.resolve('./src');
  fs.writeFileSync(`${distPath}/main.cw.ts `, template);
  console.log('✨ Generated main.cw.ts file');
}

module.exports = scaffold;