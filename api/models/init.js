const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to MongoDB local database
mongoose
  .connect(
    'mongodb://localhost/peerai',
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