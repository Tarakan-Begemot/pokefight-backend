const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  id: Number,
  name: {
    english: String,
  },
  type: [String],
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    'Sp. Attack': Number,
    'Sp. Defense': Number,
    Speed: Number,
  },
});

module.exports = mongoose.model('Card', cardSchema, 'pokedex');
