const router = require("express").Router();

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
})

router.post('/signup', (req, res, next) => {
  // connection Database & create new user Model goes here ->
})

router.get('/login', (req, res, next) => {
  res.render('auth/login');
})

router.post('/login', (req, res, next) => {

})

router.get('/logout', (req, res, next) => {
  // req.session.destroy(error => {
  //   if (error) {
  //     next(error);
  //   } else {
  //     res.redirect('/');
  //   }
  // })
});


module.exports = router;