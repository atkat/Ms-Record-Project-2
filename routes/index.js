const User = require("../models/User.model");
const router = require("express").Router();
var Discogs = require('disconnect').Client;

var dis = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET
}).database();

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login')
    }
  }
}

/* GET home page */
router.get("/", (req, res, next) => {
  res.render('index', {
    user: req.session.user
  });
});

router.get('/profile', loginCheck(), (req, res, next) => {
  User.findById(req.session.user._id).then(user => {
    const collection = user.records;
    const wishlistLength = user.wishList;
    const records = [];
    let counter = 0;
    if (collection.length === 0) {
      res.render('profile', {
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
            res.render('profile', {
              records,
              user
            })
          }
        })
    })
  })
})

router.get('/wishlist', loginCheck(), (req, res, next) => {
  User.findById(req.session.user._id).then(user => {
    const collection = user.wishList;
    const records = []
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
})

module.exports = router;