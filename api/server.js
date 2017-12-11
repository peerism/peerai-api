const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

const server = express();

const usersRouter = require('./routes/users');

// Middleware Plugins
server.use(bodyParser.json()); // allow JSON uploads
server.use(bodyParser.urlencoded({ extended: true })); // allow Form submissions
server.use(authMiddleware.initialize);
server.use('/users', usersRouter);

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
