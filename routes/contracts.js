const express = require('express');
const contractsMiddleware = require('../middleware/contracts');

const router = new express.Router();

// ROUTES

// POST localhost:7000/contracts/generate
router.post('/generate', 
  contractsMiddleware.compile,
  contractsMiddleware.deploy,
  contractsMiddleware.getContractAddress
);

module.exports = router;