const router = require("express").Router();
var Discogs = require('disconnect').Client;

var dis = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET
}).database();


router.get('/artist-search', (req, res, next) => {
  dis.search({
    title: req.query.q,
    type: 'artist'
  }).then(c => {
    //console.log(c)
    res.render('artist/artist-results', {
      artists: c.results
    })
  });
});

router.get('/artist/:id', (req, res, next) => {
  console.log(req.params.id);
  dis.getArtistReleases(req.params.id)
  .then(albums => {
    //console.log(albums);
    dis.search({ id: 13714044})
    .then(id => console.log(id))
    res.render('artist/album-view', {albums: albums.releases});
})
});

router.get('/artist/:id/:master_id', (req,res,next) => {

  dis.getMaster(req.params.master_id)
  .then(master => console.log(master))
})
module.exports = router;