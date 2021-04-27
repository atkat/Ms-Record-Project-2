const router = require("express").Router();
const User = require('../models/User.model');
const Record = require('../models/Record.model');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
})

router.post('/signup', (req, res, next) => {
  // connection Database & create new user Model goes here ->
  const {
    username,
    password
  } = req.body;
  if (password.length < 8) {
    res.render('signup', {
      message: 'Your password has to be 8 chars min'
    });
    return
  }
  if (username === '') {
    res.render('signup', {
      message: 'Your username cannot be empty'
    });
    return
  }
  User.findOne({
      username: username
    })
    .then(userFromDB => {
      if (userFromDB !== null) {
        res.render('signup', {
          message: 'This username is already taken'
        });
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash);
        User.create({
            username: username,
            password: hash
          })
          .then(createdUser => {
            console.log(createdUser);
            res.redirect('/login');
          })
      }
    })
})

router.get('/login', (req, res, next) => {
  res.render('auth/login');
})

router.post('/login', (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  User.findOne({
      username: username
    })
    .then(userFromDB => {
      if (userFromDB === null) {
        res.render('auth/login', {
          message: 'Invalid credentials'
        });
        return;
      }
      if (bcrypt.compareSync(password, userFromDB.password)) {
        req.session.user = userFromDB;
        res.redirect('/profile');
      }
    })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error);
    } else {
      res.redirect('/');
    }
  })
});


module.exports = router;