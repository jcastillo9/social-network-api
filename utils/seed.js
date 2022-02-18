const connection = require('../config/connection');
const { User , Thought } = require('../models');
const { getrandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = []
    const thoughts = getRandomThoughts(10);
})