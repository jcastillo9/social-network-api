const { User } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find({})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    // Get a single user
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a new user
    createUser(req,res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    // update a user 
    updateUser(req, res) {
        User.findOneAndUpdate(
          { users: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // Delete a user 
    deleteUser(req, res) { 
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'User deleted, but no thoughts found!' })
          : res.json({ message: 'User successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },

    // adds friend to user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: { friends: req.body } },
            { runValidators: true, new: true })
            .then(users => {
                if (!users) {
                    res.status(404).json({ message: 'No user with this ID.' });
                    return;
                }
                res.json(users);
            })
            .catch(err => res.status(400).json(err))
    },

//     // remove a friend from user list by ID
    removeFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: { friends: req.body.friendId  } }, 
            { new: true }
        )
        .then((user) => 
        !user
        ? res.status(400).json({ message: 'No user with that ID'} )
        : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
};