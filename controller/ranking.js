const todoModel = require('../model/todo');
const userModel = require('../model/user');
const mongoose = require('mongoose');

async function getRanking(req, res, next) {
  try {
    const userData = await userModel.find().select('nickName desc');
    let arr = [];
    for (let i = 0; i < userData.length; i++) {
      const id = mongoose.Types.ObjectId(userData[i]._id);
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

      arr.push(Time);
    }

    res.json({
      code: 200,
      userData,
      arr
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getRanking };
