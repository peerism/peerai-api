const express = require('express');
const User = require('../models/User');
const Skill = require('../models/Skill');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

// Register
router.post('/auth/register', 
  // Middlware Chain
  (req, res, next) => {
    console.log('Processing user registration with: ', req.body);
    authMiddleware.register(req, res, next);
  }, 
  (req, res, next) => {
    authMiddleware.signIn;
    next();
  },
  // Handler
  authMiddleware.signJWTForUser
)

router.post('/auth',
  // Middleware Chain
  authMiddleware.signIn,
  // Handler
  authMiddleware.signJWTForUser
)

// GET localhost:7000/users
router.get('/', 
  authMiddleware.validateJWT,
  (req, res) => {
    User.find()
      .populate('skill')
      .then(users => {
        console.log('Authorised: User list returned in response');
        res.json({ data: users });
      })
      .catch(error => res.status(500).json({ error: error.message }))
  }
);

// POST localhost:7000/users
router.post('/', (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user).end();
    })
    .catch(error => res.json({ error }))
});

module.exports = router;
