const userModel = require('../model/user');
const validator = require('validator');
const smsCodeModel = require('../model/smsCode');
const signTokem = require('../utils/signToken');
const mongoose = require('mongoose');

// 用户注册逻辑
async function register(req, res, next) {
  try {
    const { phone, password, code } = req.body;
    const user = await userModel.findOne({ phone });
    if (!user) {
      // 判断用户是否存在
      const isPhone = validator.isMobilePhone(phone, 'zh-CN');
      if (isPhone) {
        // 判断手机号格式是否正确
        const isCode = await smsCodeModel
          .findOne({
            code
          })
          .sort({ _id: -1 });
        if (isCode) {
          // 判断验证码是否正确
          let codeDate = new Date(isCode.createTime);
          let codeTime = Math.round(codeDate.getTime() / 1000);
          let nowTime = Math.round(Date.now() / 1000);
          console.log(nowTime);
          if (nowTime - codeTime < 5 * 60) {
            // 判断验证码是否过期
            await userModel.create({ phone, password });
            res.json({
              code: 200,
              msg: '注册成功'
            });
          } else {
            res.json({
              code: 400,
              msg: '验证码已过期'
            });
          }
        } else {
          res.json({
            code: 400,
            msg: '验证码不正确'
          });
        }
      } else {
        res.json({
          code: 400,
          msg: '手机号不合法'
        });
      }
    } else {
      res.json({
        code: 400,
        msg: '该手机号已注册'
      });
    }
  } catch (err) {
    next(err);
  }
}

// 用户登录逻辑
async function login(req, res, next) {
  try {
    const { phone, password } = req.body;
    if (phone && password) {
      const isPhone = validator.isMobilePhone(phone, 'zh-CN');
      if (isPhone) {
        const user = await userModel.findOne({ phone });
        if (user) {
          if (password === user.password) {
            const token = signTokem({ userId: user._id });
            res.json({
              code: 200,
              token
            });
          } else {
            res.json({
              code: 400,
              msg: '密码不正确'
            });
          }
        } else {
          res.json({
            code: 400,
            msg: '该手机号未注册'
          });
        }
      } else {
        res.json({
          code: 400,
          msg: '手机号不合法'
        });
      }
    } else {
      res.json({
        code: 400,
        msg: '缺少必要参数'
      });
    }
  } catch (err) {
    next(err);
  }
}

// 解密token获取用户信息
async function getUserData(req, res, next) {
  try {
    const userId = req.user.userId;
    const userData = await userModel
      .findOne({ _id: userId })
      .select('-password');
    res.json({
      code: 200,
      userData
    });
  } catch (err) {
    next(err);
  }
}

// 修改昵称、签名、头像
async function changeUserMsg(req, res, next) {
  try {
    const userId = req.user.userId;
    const body = req.body; // {"nickname": "霸王别姬"}
    const keys = Object.keys(body); // ["nickname"]
    const key = keys[0]; // "nickname"
    const changeMsg = body[key]; // "霸王"
    if (userId) {
      if (key === 'password') {
        res.json({
          code: 200,
          msg: '密码不能通过修改个人信息接口修改'
        });
        return;
      }
      const userdata = await userModel.update(
        { _id: userId },
        { $set: { [key]: changeMsg } }
      );
      res.json({
        code: 200,
        msg: `${key}修改成功`,
        userdata
      });
    } else {
      res.json({
        code: 400,
        msg: '用户未登录'
      });
    }
  } catch (err) {
    next(err);
  }
}

// 修改密码
async function changePassword(req, res, next) {
  try {
    const userId = req.user.userId;
    const { password, changePassword } = req.body;
    if (userId) {
      const userData = await userModel.findById(
        mongoose.Types.ObjectId(userId)
      );
      if (userData.password === password) {
        await userData.$set({ password: changePassword });
        await userData.save();
        res.json({
          code: 200,
          msg: '密码修改成功'
        });
      } else {
        res.json({
          code: 400,
          msg: '原密码不正确'
        });
      }
    } else {
      res.json({
        code: 400,
        msg: '用户未登录'
      });
    }
  } catch (err) {
    next(err);
  }
}

// 获取所有用户
async function getAllUser(req, res, next) {
  try {
    const data = await userModel.find();
    // .select('-password crateTime updateTime');
    res.json({
      code: 200,
      data
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  getUserData,
  changeUserMsg,
  changePassword,
  getAllUser
};
