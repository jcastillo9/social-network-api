const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
