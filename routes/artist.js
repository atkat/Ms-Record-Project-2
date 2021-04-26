const router = require("express").Router();
var Discogs = require('disconnect').Client;

// var dis = new Discogs({
//   consumerKey: process.env.CONSUMER_KEY,
//   consumerSecret: process.env.CONSUMER_SECRET
// });


router.get('/artist-search', (req, res, next) => {
  //connect to discogs Api to retrive data
  // console.log(Discogs().database().getArtist())

  res.render('artist/artist-results' /* data */ )
})

module.exports = router;