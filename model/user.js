const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    avator: {
      type: String,
      default: ''
    },
    phone: String,
    password: String,
    nickName: String,
    desc: String,
    todo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'todo'
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime'
    }
  }
);

module.exports = mongoose.model('user', user);
