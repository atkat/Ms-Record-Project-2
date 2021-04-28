const router = require("express").Router();
const User = require('../models/User.model');
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
     // console.log(albums)
      res.render('artist/album-view', {
        albums: albums.releases,
      })
    })
});

router.get('/artist/:id/addtocollection', (req, res, next) => {
  const user = req.session.user._id;
  //console.log("paramsId", req.params.id);
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
  //console.log("paramsId", req.params.id);
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

//DELETE RECORD FROM COLLECTION !!WIP
router.post('/artist/:id/delete', (req, res, next) => {
  const user = req.session.user._id;
  const record = req.params.id
  console.log("THIS", user, record);
  User
    .findByIdAndUpdate(user)
    .then( record =>  {
      console.log('TO DELETE:', record);
      user.records.filter(one => one!==record);
      res.redirect('back')
    })

});
    
module.exports = router;