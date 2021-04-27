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
  res.render("index");
});

router.get('/profile', loginCheck(), (req, res, next) => {
  const collection = req.session.user.records
  console.log(req.session.user.records);
  const records = [];
  let counter = 0

  collection.forEach(recordId => {
    dis
      .getRelease(recordId)
      .then(record => {
        counter++
        records.push(record)
        console.log(records)
        if (counter === collection.length) {
          res.render('profile', {
            records
          })
        }
      })
  })
})



router.get('/wishlist', loginCheck(), (req, res, next) => {
  const collection = req.session.user.wishList
  console.log(req.session.user.wishList);
  const records = [];
  let counter = 0

  collection.forEach(recordId => {
    dis
      .getRelease(recordId)
      .then(record => {
        counter++
        records.push(record)
        console.log(records)
        if (counter === collection.length) {
          res.render('wishlist', {
            records
          })
        }
      })
  })
})

module.exports = router;