const socketio = require('socket.io');
const cfg = {
  consumer_key: 'w3DEc5URj30i0wdjgOUvZgtha',
  consumer_secret: 'lxmAjIAe5FFQ3LBTEJg5JEroMqIvVsgSewlc4x9A7TwaqSul0J',
  token: '803309137903894528-GvtUbQ5fHrCDdZPHOBOuhNsO9REIXxt',
  token_secret: 'p0mq0bDpcklcZduTpq9mVxzRtlR11AEOpOYj6JNNxvHOq',
};

const twitter = require('node-tweet-stream')(cfg);

const attach = (server) => {
  const io = socketio(server);

  twitter.track('imdb');
  twitter.track('rotten tomatoes');

  twitter.on('tweet', (tweet) => {
    console.log(tweet.text);
    io.emit('tweet', tweet);
  });
};

module.exports = attach;
