// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Allowing this function to be used by other scripts
module.exports = function (app) {

  // directing the user to a page whenever the home page ("/") is entered
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page


    // If the user already has an account 
    if (req.user) {

      // sending the user to the members page
      res.redirect("/members");
    }

    // sending the user to the signup page
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // when the user makes login request
  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page

    // If the user already has an account 
    if (req.user) {

      // sending the user to the members page
      res.redirect("/members");
    }
    // sending the user to the signup page
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
