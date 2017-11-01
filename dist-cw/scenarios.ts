import 'reflect-metadata';

import { registerMetadata, scenarios } from '../lib';

declare var require: any;

registerMetadata([]);

require('../scenarios/demo.ts');

export { scenarios };
