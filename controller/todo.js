const userModel = require('../model/user');
const todoModel = require('../model/todo');
const mongoose = require('mongoose');

// 添加todo:userId,name,time,date,month
async function addTodo(req, res, next) {
  try {
    const { name, userId, time, date, month } = req.body;
    if (userId && name && time && date && month) {
      const data = await todoModel.create({
        user: userId,
        name: name,
        time,
        date,
        month
      });
      res.json({
        code: 200,
        data
      });
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

// 根据用户Id获取todo及allTime
async function getTodo(req, res, next) {
  try {
    const { userId } = req.params;
    const id = mongoose.Types.ObjectId(userId);
    const data = await todoModel.find({
      user: id
    });
    const Time = await todoModel.aggregate([
      {
        $match: {
          user: id
        }
      },
      {
        $group: {
          _id: '$user',
          allTime: {
            $sum: '$time'
          }
        }
      },
      {
        $project: {
          _id: 0
        }
      }
    ]);
    res.json({
      code: 200,
      allTodo: data,
      allTime: Time[0].allTime
    });
  } catch (err) {
    next(err);
  }
}

// 获取所有的数据库所有todo
async function getAllTodo(req, res, next) {
  try {
    const allTodo = await todoModel.find();
    res.json({
      code: 200,
      allTodo
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { addTodo, getTodo, getAllTodo };
