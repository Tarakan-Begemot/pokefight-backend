const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterSchema = new Schema({
  email: String,
  family_name: String,
  given_name: String,
  name: String,
  picture: String,
  score: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Master', masterSchema, 'masterdex');
