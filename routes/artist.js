const router = require("express").Router();
const User = require('../models/User.model');
const Record = require('../models/Record.model');
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
    res.render('artist/artist-results', {
      artists: c.results
    })
  });
});


router.get('/artist/:id', (req, res, next) => {
  const artistId = req.params.id;
  dis.getArtistReleases(req.params.id)
    .then(albums => {
      res.render('artist/album-view', {
        albums: albums.releases,
      })
    })
});

router.get('/artist/:id/addtocollection', (req, res, next) => {
  const user = req.session.user._id;
  console.log("paramsId", req.params.id);
  User
    .findByIdAndUpdate(user, {
      $push: {
        records: req.params.id
      }
    }, {
      new: true
    })
    .then(c => {
      res.redirect('back')
    })
})

router.get('/artist/:id/addtowishlist', (req, res, next) => {
  const user = req.session.user._id;
  console.log("paramsId", req.params.id);
  User
    .findByIdAndUpdate(user, {
      $push: {
        wishList: req.params.id
      }
    }, {
      new: true
    })
    .then(c => {
      res.redirect('back')
    })
})


module.exports = router;