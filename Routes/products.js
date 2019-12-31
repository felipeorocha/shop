const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  return res.send({ message: 'Products GET route' });
});

router.post('/', (req, res) => {
  return res.send({ message: 'Products POST route' });
});

module.exports = router;