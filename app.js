const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

const app = express();

const usersRouter = require('./routes/users');
const contractsRouter = require('./routes/contracts');

// Middleware Plugins
app.use(bodyParser.json()); // allow JSON uploads
app.use(bodyParser.urlencoded({ extended: true })); // allow Form submissions
app.use(authMiddleware.initialize);
app.use('/users', usersRouter);
app.use('/contracts', contractsRouter);

// Routes
app.get('/', (req, res) => {
  res.status(404).json({
    message: 'Error: Server under construction'
  });
})

module.exports = app;