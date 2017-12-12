const express = require('express');
const User = require('../models/User');
const Skill = require('../models/Skill');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

// Require controller modules
const usersController = require('../controllers/usersController');

// ROUTES

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
  authMiddleware.signIn,
  authMiddleware.signJWTForUser
)

// GET localhost:7000/users
router.get('/', 
  authMiddleware.validateJWT,
  usersController.userList
);

// POST localhost:7000/users/create
router.post('/create',
  authMiddleware.validateJWT,
  usersController.userCreate
);

module.exports = router;
