
// Requiring models folder
var db = require("../models");

// Requiring passport script from config
var passport = require("../config/passport");

// Allowing this function to be accesible to other scripts
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {

    // creating new user accounts
    db.User.create({

      // creating email from what the user entered
      email: req.body.email,

      // creating password from what the user entered
      password: req.body.password
    })
      // after the account is added to the database, and callback function will happen
      .then(function () {
        // if the entered information meets the criteria, the page will be redirected to login
        res.redirect(307, "/api/login");
      })

      // if the entered information contains an error because account information doesn't meet the validator
      .catch(function (err) {

        // the error will be communited to the user on the page
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {

    // function that logs out the user
    req.logout();

    // redirects the user to the homepage
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({

        // Sending back the user email address
        email: req.user.email,

        // Sending back the user id
        id: req.user.id
      });
    }
  });
};
