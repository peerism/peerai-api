'use strict';

const _ = require('lodash');
const fs = require('fs');

fs.createReadStream('.sample-env')
  .pipe(fs.createWriteStream('../.env'));

const dotenv = require('dotenv');
dotenv.load();

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 7000
};

// Check if script prefix provided (i.e. `NODE_ENV=development nodemon server.js`)
// console.log(process.env.NODE_ENV);

// Setup Node environment based on .env file else use default from hash
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
try {
  envConfig = require('./' + config.env);
  // fallback to empty object if file does not exist
  envConfig = envConfig || {};
} catch(err) {
  envConfig = {};
  console.error('Error reading .env file');
}

// Merge configs so envConfig overwrites the config object
module.exports = _.merge(config, envConfig);