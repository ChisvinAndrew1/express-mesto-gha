const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateProfileAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/me/avatar', updateProfileAvatar);

router.patch('/users/me', updateProfile);
module.exports = router;
