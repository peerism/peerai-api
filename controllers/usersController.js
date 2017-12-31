const User = require('../models/User');

// GET index -
const userList = (req, res) => {
  User.find()
    .populate('skill')
    .then(users => {
      res.body = users;
      console.log('Authorised: User list returned in response');
      res.json({ data: users });
    })
    .catch(error => res.status(500).json({ error: error.message }))
};

// POST create
const userCreate = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user).end();
    })
    .catch(error => res.json({ error }))
};

module.exports = {
  userList: userList,
  userCreate: userCreate
}