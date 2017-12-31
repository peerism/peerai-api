const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('../config/config');

console.log('Connecting to MongoDB database using database: ', config.db.url);

// Connect to MongoDB local database
mongoose
  // config.db.url differs depending on NODE_ENV
  .connect(
    config.db.url,
    { useMongoClient: true }
  )
  .then(() => {
    console.log('Successfully connected to MongoDB database');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB database: ', error);
    process.exit();
  })

module.exports = mongoose;