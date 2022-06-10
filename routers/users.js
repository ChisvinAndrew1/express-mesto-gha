const router = require('express').Router();
const {
  getUsers, getUserById, getMeInfo, updateProfile, updateProfileAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMeInfo);

router.get('/:id', getUserById);
// router.post('/users', createUser);
router.patch('/me/avatar', updateProfileAvatar);

router.patch('/me', updateProfile);
module.exports = router;
