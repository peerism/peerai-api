const Person = require('./Person');

Person.deleteMany()
  .then(() => {
    console.log('Deleted people');
    process.exit();
  })