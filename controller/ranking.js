const todoModel = require('../model/todo');

async function getRanking(req, res, next) {
  try {
    const ranking = await todoModel.aggregate([
      {
        $group: {
          _id: '$user',
          allTime: {
            $sum: '$time'
          }
        }
      },
      {
        $sort: {
          allTime: -1
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userData'
        }
      }
    ]);

    for (let i = 0; i < ranking.length; i++) {
      delete ranking[i].userData[0].password;
      delete ranking[i].userData[0].updateTime;
      delete ranking[i].userData[0].createTime;
      delete ranking[i].userData[0].avatar;
    }

    res.json({
      code: 200,
      ranking
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getRanking };
