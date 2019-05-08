const jwt = require('jsonwebtoken');

module.exports = function(data, exp) {
  exp = exp || Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  return jwt.sign(
    {
      data: data,
      exp
    },
    'lst'
  );
};
