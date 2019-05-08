const userModel = require('../model/user');
const todoModel = require('../model/todo');

async function addTodo(req, res, next) {
  try {
    const { todos, phone } = req.body;
    if (phone) {
      const user = await userModel.findOne({ phone });
      if (user) {
        const data = await todoModel.create({ user: user._id, todo: todos });
        res.json({
          code: 200,
          data
        });
      } else {
        res.json({
          code: 400,
          msg: '用户不存在'
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

async function getTodo(req, res, next) {
  try {
    const data = await todoModel.find();
    res.json({
      code: 200,
      data
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { addTodo, getTodo };
