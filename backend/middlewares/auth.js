const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedErr'); // 401

const { JWT_SECRET = 'secret-key' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Ошибка авторизации');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоад в объект запроса
  return next();
};
