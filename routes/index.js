const router = require("express").Router();

// const loginCheck = () => {
//   return (req, res, next) => {
//     // if the user is logged in proceed with the next step
//     if (req.session.user) {
//       next();
//     } else {
//       // otherwise redirect to /login
//       res.redirect('/login')
//     }
//   }
// }

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");

});

router.get('/profile', (req, res, next) => {
  res.render('profile')

})

module.exports = router;