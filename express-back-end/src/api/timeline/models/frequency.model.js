const { Schema, model } = require('mongoose');

const Frequency = new Schema({
  word: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  media_outlet: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  freq: {
    type: Number,
    required: true,
  },
});

Frequency.set('collection', 'frequency');

module.exports = model('frequency', Frequency);
