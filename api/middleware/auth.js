const passport = require('passport');
// const LocalStrategy = require('passport-local');
const User = require('../models/User');

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
// since using `email` instead of `username`. 
// See https://github.com/saintedlama/passport-local-mongoose
passport.use(User.createStrategy());
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   (email, password, done) => {
//     User.findOne({
//       email: email
//     }, (error, user) => {
//       if (error) {
//         return done(error);
//       }
//       if (!user) {
//         return done(null, false, {
//           message: 'Username or password incorrect'
//         });
//       }
//       // Do other validation/check if any
//       return done(null, user);
//     });
//   }
// ));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for Passport Authentication
const register = (req, res, next) => {

  console.log('Middlware for Passport Authentication');
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
  register: register
}
