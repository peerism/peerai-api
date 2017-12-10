const passport = require('passport');
const User = require('../models/User');

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

module.exports = {
  register: register,
  signIn: passport.authenticate('local', { session: false })
}
