const express = require('express');
const bodyParser = require('body-parser');

const server = express();

// Middleware Plugins
server.use(bodyParser.json()); // allow JSON uploads

// Routes
server.get('/', (req, res) => {
  res.json({});
})

server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting server: ', error);
  } else {
    console.log('Success starting server http://localhost:7000/');
  }
})
