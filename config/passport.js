const localStrategy = require('passport-local').Strategy;
const UserService = require('../services/user-service');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    UserService.find({'_id': id})
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  })

  passport.use('signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, name, email, password, done) {
      UserService.find({'email': email})
        .then(user => {
          if (user) {
            return done(null, false, req.flash('signupMessage', 'Email is already taken'));
          }
          else {
            var newUser = {
              email: email,
              name: name,
              password: password
            }

            UserService.create(newUser)
              .then(user => {
                return done(null, user);
              })
              .catch(err => {
                throw err;
              });
          }
        })
        .catch(err => {
          return done(err);
        });
    }))


};
