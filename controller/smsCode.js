const smsCodeModel = require('../model/smsCode');
const userModel = require('../model/user');
const validator = require('validator');
const smsUtils = require('../utils/smsUtils');

async function sendCode(req, res, next) {
  try {
    const { phone } = req.body;
    const user = await userModel.findOne({ phone });
    if (!user) {
      const isPhone = await validator.isMobilePhone(phone, 'zh-CN');
      if (isPhone) {
        let sixCode = '';
        for (let i = 0; i < 6; i++) {
          sixCode += Math.floor(Math.random() * 10) + '';
        }
        const smsRes = await smsUtils(phone, sixCode);
        if (smsRes.Code === 'OK') {
          await smsCodeModel.create({
            phone,
            code: sixCode
          });
          res.json({
            code: 200,
            msg: '短信发送成功'
          });
        } else {
          res.json({
            code: 500,
            msg: smsRes.Code
          });
        }
      } else {
        res.json({
          code: 200,
          msg: '手机号不合法'
        });
      }
    } else {
      res.json({
        code: 200,
        msg: '该手机号已注册'
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { sendCode };
