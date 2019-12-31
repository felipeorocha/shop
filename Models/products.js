const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Products', productsSchema);
