const passport = require('passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'xyz';
const JWT_ALGORITHM = 'HS256';
const JWT_EXPIRES_IN = '7 days';

// Use "createStrategy" instead of "authenticate".
// See https://github.com/saintedlama/passport-local-mongoose
passport.use(User.createStrategy());

// Use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for Passport Authentication
const register = (req, res, next) => {

  console.log('Middlware for Passport Registration');
  // Create new User model
  const user = new User({
    email: req.body.email,
    name: req.body.name
  })

  // Pass the User model to the Passport `register` method
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      console.error('Error registering user with middleware: ', error);
      next(error);
      return;
    }
    console.log('Success registering user with middleware: ', user);
    // Store user so we can access in our handler
    req.user = user;
    next();
  })
}

// JWT signed token - http://jwt.io/
const signInWithJWTForUser = (req, res) => {

  // Obtain user from request object
  const user = req.user;

  // Create signed JWT
  const token = JWT.sign(
    // payload
    {
      email: user.email
    },
    // secretOrPrivateKey - https://raymii.org/s/snippets/OpenSSL_Password_Generator.html
    JWT_SECRET,
    // options - https://github.com/auth0/node-jsonwebtoken
    {
      algorithm: JWT_ALGORITHM,
      expiresIn: JWT_EXPIRES_IN,
      subject: user._id.toString()
    }
  )

  // Return token in response object
  res.json({
    token: token
  })
}

// Response is 200 when authorized and 403 when not authorized
// Cookie: connect.sid=xs<INSERT_COOKIE>
const signInWithCookiesForUser = (req, res) => {
  if (req.user) {
    res.error;
  } else {
    res.status(403).end();
  }
}

module.exports = {
  // Initialise Passport to accept sessions and scan for cookies
  initialize: [ passport.initialize(), passport.session() ],
  register: register,
  // Sign In with JWT
  signIn: passport.authenticate('local', { session: true }),
  signInWithJWTForUser: signInWithJWTForUser,
  // Sign In with Cookies
  signInWithCookiesForUser: signInWithCookiesForUser
}
