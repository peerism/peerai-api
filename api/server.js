const express = require('express');
const bodyParser = require('body-parser');

const server = express();

const peopleRouter = require('./routes/people');

// Middleware Plugins
server.use(bodyParser.json()); // allow JSON uploads
server.use(bodyParser.urlencoded({ extended: true })); // allow Form submissions
server.use('/people', peopleRouter);

// Routes
server.get('/', (req, res) => {
  res.json({})
})

const port = 7000;
server.listen(port, (error) => {
  if (error) {
    console.error('Error starting server: ', error);
  } else {
    console.log(`Success starting server http://localhost:${port}/`);
  }
})
