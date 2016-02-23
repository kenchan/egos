var Twitter = require('twitter');
var Request = require('request');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

client.stream('statuses/filter', {track: process.env.TRACK_KEYWORDS}, function(stream) {
  stream.on('data', function(tweet) {
    Request.post(process.env.TAKOSAN_URL).form({
      channel: process.env.SLACK_CHANNEL,
      name: 'ついったーさん'
      icon: ':twitter:',
      author_icon: tweet.user.profile_image_url,
      author_name: tweet.user.name,
      author_link: 'https://twitter.com/' + tweet.user.screen_name,
      text: tweet.text + "\n" + 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str
    });
    console.log(tweet.user.screen_name + ":" + tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});
