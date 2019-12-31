const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', usersSchema);
