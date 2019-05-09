const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: ''
    },
    phone: String,
    password: String,
    nickName: String,
    desc: String
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
