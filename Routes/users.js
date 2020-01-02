const express = require("express");
const router = express.Router();
const Users = require('../Models/users');

router.get('/', (req, res) => {
  Users.find({}, (err, data) => {
    const isAdmin = true;
    if (err) {
      return res.send({ message: 'Error on users list query.' })
    } else {
        if(isAdmin) {
          return res.send(data); // Return users list. Should be an authenticated route, only admin may access.
        } else {
          return res.send({ message: 'Admin only.' })
        }
    }
  });
});

router.get('/:_id', (req, res) => {
  const { _id } = req.params;
  Users.findOne({ _id }, (err, data) => {
    if (err) {
      return res.send({ message: `Error on user search. Be sure of user's id. ${err}` })
    }
      return res.send(data)
  })
})

router.post('/create', (req, res) => {
  const { login, password, name } = req.body;

  if (!login) {
    res.send({ message: 'You must enter your login.' });
  } if (!password) {
    res.send({ message: 'You must enter your password.' });
  }

  Users.findOne({ login }, (err, data) => {
    if (err) {
      return res.send({ message: 'Error searching user.' });
    } if (data) {
      return res.send({ message: 'User already registered.' });
    }

    Users.create({ login, password, name }, (err, data) => { // req.body
      if (err) {
        return res.send({ message: `Error creating user. ${err}` })
      } else {
        data.password = undefined;
        return res.send(data)
      }
    });
  });
});

module.exports = router;