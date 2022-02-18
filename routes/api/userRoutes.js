const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/:userId
router.route('/:userId')
    .get(getSingleUser)
    .post(deleteUser);

    module.exports = router;