const passport = require('passport');
const User = require('../models/User');

// Use "createStrategy" instead of "authenticate".
// See https://github.com/saintedlama/passport-local-mongoose
passport.use(User.createStrategy());

// Use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// https://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// Middleware for Passport Authentication
const register = (req, res, next) => {

  console.log('Middleware for Passport Registration');
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

// Response is 200 when authorized and 403 when not authorized
// Cookie: connect.sid=xs<INSERT_COOKIE>
// const signInWithCookiesForUser = (req, res) => {
//   if (req.body.user) {
//     console.log('Success signing in with cookies for user');
//     res.json(res.body.user);
//   } else {
//     console.error('Error signing in with cookies for user: ', req.body.user);
//     res.status(403).end();
//   }
// }

module.exports = {
  // Initialise Passport to accept sessions and scan for cookies
  initialize: [ passport.initialize(), passport.session() ],
  register: register,
  // Sign In
  signIn: passport.authenticate('local', { session: true }),
  // Sign In with Cookies
  // signInWithCookiesForUser: signInWithCookiesForUser
}
