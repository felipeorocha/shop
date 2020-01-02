const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  return res.send({ message: 'Index GET route. Should be home page.' });
});

module.exports = router;