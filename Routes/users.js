const express = require("express");
const router = express.Router();
const Users = require('../Models/users');

router.get('/', (req, res) => {
  Users.find({}, (err, data) => {
    if (err) {
      return res.send({ message: 'Error on user query.' })
    } else {
      return res.send(data);
    }
  });
});

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