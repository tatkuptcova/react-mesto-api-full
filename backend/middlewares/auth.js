const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedErr'); // 401

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let token = req.cookies.jwt;
  
  const authHeader = req.header('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]
  }

  if (!token) {
    throw new UnauthorizedError('Ошибка авторизации');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET: 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоад в объект запроса
  return next();
};
