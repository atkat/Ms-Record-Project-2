const router = require("express").Router();
var Discogs = require('disconnect').Client;

var dis = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET
}).database();


router.get('/artist-search', (req, res, next) => {
  //connect to discogs Api to retrive data
  dis.search({
    title: req.query.q,
    type: 'artist'
  }).then(c => {
    console.log(c)
    res.render('artist/artist-results', {
      artists: c.results
    })
  });

  //router.get('/artist-details', (req))

  // dis.getArtist(108713)
  //   .then(c => {
  //     console.log(c)
  //   });

  // .search({
  //   artist: `${req.query.q}`
  // })
  // .then(artistsFromDiscogs => {
  //   console.log(artistsFromDiscogs);
  //   res.render('artist/artist-results')
  // })



})
module.exports = router;