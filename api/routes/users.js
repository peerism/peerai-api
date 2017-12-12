const express = require('express');
const User = require('../models/User');
const Skill = require('../models/Skill');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

const authorize = (err, req, res, next) => {
  if (err) {
    console.error('Error registering user with middleware: ', err.stack);
    res.status(403).end();
  }
  if (req.user) {
    console.log(`Authorising access to ${req.url}`);
    next();
  } else {
    console.log('No user when authorising');
  }
}

router.get('/', authorize, (req, res) => {
  console.log('Performing query for user');
  User.find()
  .populate('skill')
  .then(users => res.json({ data: users }))
  .catch(error => res.json({ error: error.message }))
});

// Register
router.post('/auth/register', 
  // Middlware Chain
  // (req, res, next) => {
  //   console.log('Processing user registration with: ', req.body);
    authMiddleware.register,//(req, res, next)
  //   next();
  // },
  // Handler
  (req, res) => {
    res.json({ user: req.user })
  }
  // authMiddleware.signInWithCookiesForUser
)

router.post('/auth',
  // Middleware Chain
  authMiddleware.signIn,
  // Handler returns Cookie
  (req, res) => {
    res.json({ user: req.user })
  }
  // authMiddleware.signInWithCookiesForUser
)

router.post('/', (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user).end();
    })
    .catch(error => res.json({ error }))
});

module.exports = router;
