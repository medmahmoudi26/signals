var LocalStrategy = require("passport-local").Strategy;
var mongoose      = require("mongoose");
var bcrypt        = require("bcrypt-nodejs");

var User = require("../models/user");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, function(email, password, done) {
          // Match user
          User.findOne({email: email}, function (err, user) {
            if (err) {
              return done(null, false, {message: err});
            } else if (!user) {
              return done(null, false, {message: "Cet email n'existe pas"});
            } else {
              if (bcrypt.compareSync(password, user.password)) {
                return done(null, user); // all conditions exist
              } else {
                return done(null, false, {message: "Mot de passe incorrecte"});
              }
            }
          });
        })
      );
      // serializing
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  // deserializing
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}