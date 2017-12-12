const passport = require('passport');
const JWT = require('jsonwebtoken');
const PassportJwt = require('passport-jwt');
const User = require('../models/User');

const JWT_SECRET = 'xyz';
const JWT_ALGORITHM = 'HS256';
const JWT_EXPIRES_IN = '7 days';

// Use "createStrategy" instead of "authenticate".
// See https://github.com/saintedlama/passport-local-mongoose
passport.use(User.createStrategy());

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

// const jwtOptions = {
//   //   - Authorization: Bearer in request headers
//   jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: JWT_SECRET,
//   //   - Algorithms used to sign in
//   algorithms: [JWT_ALGORITHM]
// }

// // Passport JWT - https://www.npmjs.com/package/passport-jwt
// passport.use(new PassportJwt.Strategy(jwtOptions, 
//   // Post-Verified token - https://www.npmjs.com/package/passport-jwt
//   (jwtPayload, done) => {
//     console.log('PassportJwt Strategy being processed');
//     // Find user in MongoDB using the `id` in the JWT
//     // User.findById(jwtPayload.sub)
//     User.findById(jwtPayload._doc._id)
//       .then((user) => {
//         if (user) { 
//           done(null, user); 
//         } else {
//           done(null, false); 
//         }
//       })
//       .catch((error) => {
//         done(error, false);
//       })
//   }
// ))

const validateJWT = (req, res, next) => {
  // Extract token without "JWT " or "Bearer " prefix
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
  if (token) {
    // https://github.com/auth0/node-jsonwebtoken
    JWT.verify(token, JWT_SECRET, function(error, decodedToken) {
      if (error) {
        res.status(401).json({
          message: 'Error: Token invalid'
        });
        console.error('Error: Token invalid: ', error);
        next(error);
        return;
      } else {
        req.user = decodedToken;
        User.find({ email: decodedToken.email })
          .then((user) => {
            if (user) { 
              console.log('Success authorising user with middleware: ', decodedToken);
              next(); 
            } else {
              res.status(403).json({
                message: 'Error: Token valid but user no longer exists in database'
              });
              console.error('Error: Token valid but user no longer exists in database: ', error);
              next(error);
              return;
            }
          })
          .catch((error) => {
            res.status(500).json({
              message: 'Error: Token valid but error occurred retrieving user from database'
            });
            console.error('Error: Token valid but error occurred retrieving user from database: ', error);
            next(error);
            return;
          })
      }
    });
  } else {
    res.status(401).json({
      message: "Error: No Token provided"
    });
    console.error('Error: No Token provided: ', error);
    next(error);
    return;
  }
}

// JWT signed token - http://jwt.io/
const signJWTForUser = (req, res) => {

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
      subject: user._id.toString(),
      algorithm: JWT_ALGORITHM,
      expiresIn: JWT_EXPIRES_IN
    }
  )

  // Return token in response object
  res.json({
    token: token
  })
}

module.exports = {
  initialize: passport.initialize(),
  register: register,
  signIn: passport.authenticate('local', { session: false }),
  signJWTForUser: signJWTForUser,
  // requireJWT: passport.authenticate('jwt', { session: false }),
  validateJWT: validateJWT
}
