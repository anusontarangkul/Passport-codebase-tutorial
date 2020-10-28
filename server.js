// Requiring necessary npm packages

// Allowing server.js file access to Express 
var express = require("express");

// Allowing server.js to access sessions
var session = require("express-session");

// Allowing server.js to access passport
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting the PORT to listen to the enivornment variable PORT or 8080 if nothing is there.
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;

// Alowing server.js to access the script files inside models
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();

// Allowing middleware to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));

// Allowing middleware to recognize the incoming Request Object as a JSON object
app.use(express.json());

// Allowing middleware to serve static files
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status

// using hash to secure the login password
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

// Allowing middleware to initalize the passport
// Checking to see if user property is not null
app.use(passport.initialize());

// Allowing middleware to alter the request object and change the 'user' value into the deserialized user object.
// Bringing up session based on the user.
app.use(passport.session());

// Requiring our routes

// Requiring html routes
require("./routes/html-routes.js")(app);

// Requiring api routes
require("./routes/api-routes.js")(app);

// Syncing our database 
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    // Letting the user know which port is being in used and a link to access it.
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
