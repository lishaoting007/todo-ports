const userModel = require('../model/user');
const validator = require('validator');
const smsCodeModel = require('../model/smsCode');
const signTokem = require('../utils/signToken');

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
      .select('-password')
      .populate({ path: 'todo' });
    res.json({
      code: 200,
      userData
    });
  } catch (err) {
    next(err);
  }
}
module.exports = { register, login, getUserData };
