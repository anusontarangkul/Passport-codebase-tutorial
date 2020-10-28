// Requiring passport dependency to be used
var passport = require("passport");

// Requiring passport strategy for authenticating with a username and password
var LocalStrategy = require("passport-local").Strategy;

// Requiring the files inside models directory
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  // Taking in the email and password that the user entered
  function (email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      // Matching email with the email inside the database
      where: {
        email: email
      }
      // promise after the information has been entered
    }).then(function (dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        // returning the function to false
        return done(null, false, {
          // informing the user that the email is incorect
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        // returning the function to false
        return done(null, false, {

          // informing the user that the password is incorrect
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
