const User = require("../models/User.model");
const router = require("express").Router();
var Discogs = require('disconnect').Client;

var dis = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET
}).database();


router.get('/artist/:main_release/albumStats', (req, res, next) => {
  const recordId = req.params.main_release
  User.find({
      records: req.params.main_release
    })
    .then(inCollection => {
      User.find({
          wishList: req.params.main_release
        })
        .then(inWishlist => {
          res.render('user/albumStats', {
            inCollection,
            inWishlist
          });
        })
    })
})

router.get('/profile/:userName', (req, res, next) => {
  if (req.session.user) {
    User.findOne({
      username: req.params.userName
    }).then(user => {
      const collection = user.records;
      const wishlistLength = user.wishList;
      const records = [];
      let counter = 0;
      if (collection.length === 0) {
        res.render('user/user', {
          user
        })
      }
      collection.forEach(recordId => {
        dis
          .getRelease(recordId)
          .then(record => {
            counter++
            records.push(record)
            if (counter === collection.length) {
              res.render('user/user', {
                records,
                user
              })
            }
          })
      })
    })
  } else res.redirect('/signup')
})

router.get('/profile/:userName/wishlist', (req, res, next) => {
  if (req.session.user) {
    User.findOne({
      username: req.params.userName
    }).then(user => {
      const collection = user.records;
      const records = [];
      let counter = 0;
      if (collection.length === 0) {
        res.render('wishlist', {
          user
        })
      }

      collection.forEach(recordId => {
        dis
          .getRelease(recordId)
          .then(record => {
            counter++
            records.push(record)
            if (counter === collection.length) {
              res.render('wishlist', {
                records,
                user
              })
            }
          })
      })
    })
  } else res.redirect('/signup')
})

module.exports = router;