const mongoose = require('mongoose');

const todo = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId
    },
    name: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    },
    date: {
      type: String,
      default: ''
    },
    month: {
      type: String,
      default: ''
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('todo', todo);
