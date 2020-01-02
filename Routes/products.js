const express = require("express");
const router = express.Router();
const Products = require('../Models/products');

router.get('/', (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    Products.find({}, (err, data) => {
      if (err) {
        return res.send({ message: 'Error on products list query.' })
      } else {
        return res.send(data); // Return products list.
      }
    });
  } else {
    Products.findOne({ _id }, (err, data) => {
      if (err) {
        return res.send({ message: `Error on product search. ${err}` })
      } else {
        if (!data) {
          return res.send({ message: "Product not found" });
        } else {
          return res.send(data);
        }
      }
    });
  }
});

router.post('/create', (req, res) => {
  const { name, price } = req.body;

  if (!name) {
    res.send({ message: 'You must enter product name.' });
  } if (!price) {
    res.send({ message: 'You must enter product price.' });
  }

  Products.findOne({ name }, (err, data) => {
    if (err) {
      return res.send({ message: `Error searching product. ${err}` });
    } if (data) {
      return res.send({ message: 'Product already registered.' });
    }

    Products.create({ name, price }, (err, data) => { // req.body
      if (err) {
        return res.send({ message: `Error creating product. ${err}` })
      } else {
        return res.send(data)
      }
    });
  });
});

router.delete('/delete', (req, res) => {
  const { _id } = req.params;
  Products.findOne({ _id }, (err, data) => {
    if (err) {
      if (!_id) {
        return res.send({ message: `Product not found. ${err}` });
      }
    } else {
      Products.deleteOne({ _id }, (err, data) => {
        if (err) {
          return res.send({ message: `Error deleting product. ${err}` })
        } else {
          return res.send(data);
        }
      });
    }
  })
});

module.exports = router;