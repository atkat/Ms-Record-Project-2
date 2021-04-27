const router = require("express").Router();

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
  res.render('profile');
})

router.get('/wishlist', loginCheck(), (req, res, next) => {
  res.render('wishlist');
})

module.exports = router;