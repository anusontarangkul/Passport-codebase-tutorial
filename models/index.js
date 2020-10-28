
// Defining the code to be executed in "strict mode" to help write secure javascript
'use strict';

// Requiring File system module
var fs = require('fs');

// Requiring path module
var path = require('path');

// Requiring sequelize module 
var Sequelize = require('sequelize');

// Returning filename part of a file path
var basename = path.basename(module.filename);

// Setting environmental variable to production or development
var env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../config/config.json')[env];

// Creating empty db variable to hold empty object
var db = {};
// Using sequelize connection
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  // Using development environment
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  // Reading the files inside the models directory
  .readdirSync(__dirname)
  // Filtering the filers for js files except the basename set
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  // Setting each model into the empty object to be imported as a table
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

//Looping through each key in the db Ojbect
Object.keys(db).forEach(function (modelName) {
  //Running associate methoid if the object has any connections to the table
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// Exporting db to be used in other scripts
module.exports = db;
