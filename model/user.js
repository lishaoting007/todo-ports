const mongoose = require('mongoose');

const user = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560257929315&di=f4551589415297ef70621719dcd23023&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F09%2F13%2F2257d80d79e23ad.jpg'
    },
    phone: String,
    password: String,
    nickName: {
      type: String,
      default: '一个小番茄'
    },
    desc: {
      type: String,
      default: '千里之行，始于足下'
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
