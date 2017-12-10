const express = require('express');
const Person = require('../models/Person');
const Skill = require('../models/Skill');

const router = new express.Router();

router.get('/', (req, res) => {
  Person.find()
  .populate('skill')
  .then(people => res.json({ data: people }))
  .catch(error => res.json({ error: error.message }))
});

router.post('/', (req, res) => {
  Person.create(req.body)
    .then((person) => {
      res.status(201).json(person).end();
    })
    .catch(error => res.json({ error }))
});

module.exports = router;
