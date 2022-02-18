const connection = require('../config/connection');
const { User , Thought } = require('../models');
const { getrandomUsername, getRandomEmail, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = []
    const thoughts = [];

    for (users.length < 20) {
        const username = getRandomUsername();
        const email = getRandomEmail();
        users.push({
            username,
            email
        })
    }
    await User.collection.insertMany(users)

  while (thoughts.length < 100) {
    const username = getRandomArrItem(users).username;
    const thoughtText = getThought();
    thoughts.push({
      thoughtText,
      username
    })
  }

  await Thought.collection.insertMany(thoughts)

  for (let i = 0; i < 100; i++) {
    const thought = thoughts[i];
    await User.collection.findOneAndUpdate(
      { username: thought.username },
      { $addToSet: { thoughts: thought._id, 
        friends: getRandomArrItem(users)._id } },
    )
  }

  for(let i = 0 ; i < 300 ; i++) {
    const reactionBody = getReaction();
    const username = getRandomArrItem(users).username;
    const reaction = { reactionBody, username }
    const thoughtId = getRandomArrItem(thoughts)._id;
    await Thought.collection.findOneAndUpdate(
      { _id: thoughtId },
      { $addToSet: { reactions: reaction } },
    )
  }


  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
})