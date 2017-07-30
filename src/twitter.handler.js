const twitter = io();

const container = $('#twitter-feed');

const addToFeed = (tweet, container) => {
  const containerElements = container.children().length;
  
  if (containerElements >= 20) {
    container.children().last().remove();
  }

  const $div = $('<div/>')
    .addClass('panel')
    .addClass('panel-default');
  
  const $heading = $('<div/>')
    .addClass('panel-heading');

  const $body = $('<div/>')
    .addClass('panel-body');
  
  const $authorImg = $('<img/>')
    .attr('src', tweet.user.profile_image_url)
    .appendTo($heading);

  const $author = $('<div/>')
    .text(tweet.user.name)
    .appendTo($heading);
  
  const $created = $('<p/>')
    .text(tweet.created_at)
    .appendTo($heading);
  
  const $contents = $('<p/>')
    .text(tweet.text)
    .appendTo($body);
  
  $heading.appendTo($div);
  $body.appendTo($div);
  
  $div.prependTo(container);
};

twitter.on('tweet', (tweet) => {
  return addToFeed(tweet, container);
});
