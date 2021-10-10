const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getUsers, getCurrentUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9\-.]{1,}\.[a-z]{1,5}([/a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)/),
  }),
}), updateAvatar);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

module.exports = router;
