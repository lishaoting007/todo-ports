const mongoose = require('mongoose');

const todo = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId
    },
    name: String,
    time: Number,
    date: String,
    month: String
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('todo', todo);
