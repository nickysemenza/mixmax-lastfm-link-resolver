var key = require('../utils/key');
var request = require('request');
// The API that returns the in-email representation.
module.exports = function(req, res) {
  const url = req.query.url.trim();
  console.log(url);
  const matches = url.match("[^\/]+$");//select the username from last.fm/user/[username]
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }
  let username = matches[0];
  const response = request({
    url: `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${key}&format=json&period=1month`,
    gzip: true,
    json: true,
    timeout: 15 * 1000
  }, (err, response) => {
    if (err) {
      res.status(500).send('Error');
      return;
    }
    let data = response.body.topartists.artist;
    let topThree = [];
    let imageElements = data.map((eachArtist, index)=>{
      if(index < 3)
        topThree.push(eachArtist.name);
      let imageURL = eachArtist.image[0]['#text'];
      let artistURL = eachArtist.url
      return imageURL=="" ? "" : `<a href=${artistURL}><img src=${imageURL}/></a>`
    })

    console.log(imageElements);

    // var image = response.body.data.images.original;
    // var width = image.width > 600 ? 600 : image.width;
    const html = `<div style="border:1px solid #d5ecff;">
      <h3><a href="https://last.fm/user/${username}">${username}</a> on last.fm likes to listen to ${topThree.join(', ')}, and more...</h3>
      ${imageElements.join('')}
      </div>`;
    res.json({
      body: html
    });
  });
};