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
  console.log('this is the cookie: ', req.cookies);
  console.log('this is the logged in user: ', req.session.user);
  res.render('profile');
})

module.exports = router;