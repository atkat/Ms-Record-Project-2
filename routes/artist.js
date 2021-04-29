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
      artists: c.results,
      user: req.session.user
    })
  });
});

router.get('/artist/:id', (req, res, next) => {
  const user = req.session.user;
  if (user) {
    User.findById(req.session.user._id).then(user => {
      dis.getArtistReleases(req.params.id)
        .then(albums => {
          albums.releases.forEach(album => {
            album.addedToWishlist = (user.wishList.some(recordId => {
              return recordId === String(album.main_release) || recordId === String(album.id)
            }))
            album.addedToRecords = (user.records.some(recordId => {
              return recordId === String(album.main_release) || recordId === String(album.id)
            }))
          });
          console.log(albums.releases)
          res.render('artist/album-view', {
            albums: albums.releases,
            artistId: req.params.id,
            user: req.session.user
          })
        })
    })
  } else {
    dis.getArtistReleases(req.params.id).then(albums => {
      res.render('artist/album-view', {
        albums: albums.releases,
        artistId: req.params.id
      })
    })
  }
});

router.get('/artist/:id/addtocollection', (req, res, next) => {
  const userId = req.session.user._id
  User
    .findByIdAndUpdate(userId, {
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
  const user = req.session.user._id
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

//DELETE RECORD 
router.get('/artist/:id/delete', (req, res, next) => {
  const user = req.session.user._id
  User
    .findByIdAndUpdate(user, {
      $pull: {
        records: req.params.id
      }
    })
    .then(() => {
      res.redirect('/profile')
    })
});

router.get('/artist/:id/deleteWishList', (req, res, next) => {
  const user = req.session.user._id
  User
    .findByIdAndUpdate(user, {
      $pull: {
        wishList: req.params.id
      }
    })
    .then(() => {
      res.redirect('/wishlist')
    })
});

router.get('/artist/:artistId/album/:main_release', (req, res, next) => {
  const albumId = req.params.main_release;
  dis
    .getRelease(albumId).then(albumFromDiscogs => {
      res.render('artist/album-details', {
        tracklist: albumFromDiscogs.tracklist,
        albumDetails: albumFromDiscogs,
        coverImg: albumFromDiscogs.images[0].uri,
        user: req.session.user
      })
    })
})

router.get('/user/editProfile', (req, res, next) => {
  const user = req.session.user._id;
  User.findById(user).
  then(userFromDB => {
    res.render('user/editProfile', {
      userFromDB
    })
  })
})

router.post('/editProfile', (req, res, next) => {
  const user = req.session.user._id;
  //console.log("THIS IS BODY:", req.body);
  const {
    aboutMe,
    city,
    country
  } = req.body;
  User
    .findByIdAndUpdate(user, {
      aboutMe,
      city,
      country
    }, {
      new: true
    })
    .then(user => {
      //console.log(updatedUser)
      res.redirect('/profile')
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router;