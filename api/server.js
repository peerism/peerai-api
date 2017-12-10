const express = require('express');
const bodyParser = require('body-parser');

const Person = require('./models/person');
const Skill = require('./models/skill');

const server = express();

// Middleware Plugins
server.use(bodyParser.json()); // allow JSON uploads

// Routes
server.get('/', (req, res) => {
  Person.find()
  .populate('skill')
  .then(people => res.json(people))
  .catch(error => res.json({ error }))
})

server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting server: ', error);
  } else {
    console.log('Success starting server http://localhost:7000/');
  }
})
