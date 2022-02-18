const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    // get one thought by ID
    getSingleThought(req,res) {
        Thought.findOne()({ _id: req.params.thoughtId })
        .then((thought) => 
            !thought 
            ? res.status(400).json({ message: 'No thought with that ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

    // create new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            );
        })
        .then((user) =>
        !user
        ? res.status(400).json({ message: 'Thought created, but found no user with that ID'
        })
        : res.json('Created the thought!')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // update thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID'})
        : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // deletes thought by ID
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID'}
        )
        :User.findByIdAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId  } },
            { new: true }
        )
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'Thought created but no user with that ID',
        })
        : res.json({ message: 'Thoguth successfully deleted.'})
        )
        .catch((err) => res.status(500).json(err));
    },
    

}