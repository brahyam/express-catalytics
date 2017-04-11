var express = require('express');
var router = express.Router();


module.exports = function (passport) {

  /* GET users listing. */
  router.get('/login', function (req, res, next) {
    res.render('login', {message: req.flash('loginMessage')});
  });

  router.post('/login', function (req, res, next) {
    res.send('respond with a resource');
  });

  router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
  });

  router.get('/signup', function (req, res, next) {
    res.render('signUp');
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  return router;
};

module.exports = router;
