
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

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// Exporting db to be used in other scripts
module.exports = db;
