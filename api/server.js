const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

const server = express();

const usersRouter = require('./routes/users');

// Middleware Plugins
server.use(require('cookie-parser')()); // adds Cookies to Request object req.cookies
server.use(require('express-session')( 
  // https://github.com/expressjs/session#options
  { secret: 'secret', resave: false, saveUninitialized: false } // signed cookies so not easily discernable
));
server.use(bodyParser.json()); // allow JSON uploads
server.use(bodyParser.urlencoded({ extended: true })); // allow Form submissions
server.use(authMiddleware.initialize);
server.use('/users', usersRouter);

// Routes
server.get('/', (req, res) => {
  let html = '<form action="/" method="post">' +
  'Email: <input type="text" email="email"><br>' +
  '<button type="submit">Submit</button>' +
  '</form>';
  
  if (req.session.email) {
    html += '<br>Your email from your session is: ' + req.session.email;
  }
  res.send(html);
})

server.post('/', (req, res) => {
  req.session.email = req.body.email;
  res.redirect('/');
});

const port = 7000;
server.listen(port, (error) => {
  if (error) {
    console.error('Error starting server: ', error);
  } else {
    console.log(`Success starting server http://localhost:${port}/`);
  }
})
