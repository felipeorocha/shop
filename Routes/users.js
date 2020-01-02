const express = require("express");
const router = express.Router();
const Users = require('../Models/users');

router.get('/', (req, res) => {
  const { _id } = req.body;
  if (!_id) {
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
  } else {
    Users.findOne({ _id }, (err, data) => {
      if (err) {
        return res.send({ message: `Error on user search. ${err}` })
      } else {
        if (!data) {
          return res.send({ message: "User id not found" });
        } else {
          return res.send(data);
        }
      }
    });
  }
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

router.delete('/delete', (req, res) => {
  const { _id } = req.body;
  Users.findOne({ _id }, (err, data) => {
    if (err) {
      if (!_id) {
        return res.send({ message: `User not found. Invalid user id. ${err}` });
      }
    } else {
      Users.deleteOne({ _id }, (err, data) => {
        if (err) {
          return res.send({ message: `Error deleting user. ${err}` })
        } else {
          return res.send(data);
        }
      });
    }
  })
});

module.exports = router;