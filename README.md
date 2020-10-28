# Passport Authentication Codebase Tutorial

[Deployment]()

## Description

This is an in-depth tutorial on the Passport Authentication application to help onboard new developers. This tutorial will explain every file and its purpose in as fine as detail as possible. This tutorial will include details of wheter one file is dependant on other files. The code will contain line-by-line commenting for further explanation.

## Table of Contents

- [Files](#Files)

  - [config Directory](#config)

    - [middleware Directory](#middleware)

      - [isAuthenticated.js](#isAuthenticated.js)

    - [config.json](#config.json)

    - [passport.js](#passport.js)

  - [models directory](#models)

    - [index.js](#index.js)

    - [user.js](#user.js)

  - [public directory](#public)

    - [js directory](#js)

      - [login.js](#login.js)

      - [members.js](#members.js)

      - [signup.js](#signup.js)

    - [stylesheets directory](#stylesheets)

      - [style.css](#style.css)

    - [login.html](#login.html)

    - [members.html](#members.html)

    - [signup.html](#signup.html)

  - [routes directory](#routes)

    - [api-routes.js](#api-routes.js)

    - [html-routes.js](#html-routes.js)

  - [.gitignore](#.gitignore)

  - [LICENSE](#LICENSE)

  - [package.json](#package.json)

  - [README.md](#README.md)

  - [server.js](#server.js)

- [How To Add Changes](#Changes)

- [Installation](#Installation)

- [Technologies](#Technologies)

- [Dependencies](#Dependencies)

- [Credits](#Credits)

- [License](#License)

## Files

### config

This directory contains files used to configure the parameters and initial settings.

#### middleware

This directory contailes configuration files that are middleware.

##### isAuthenticated.js

This application requires users to login to access certain routes. This middleware restricts the users to certain routes that requires being logged in when the user isn't logged in. If the user tries to acess a route without being logged in, the user will be redirected to the "/" page.

#### config.json

The purpose of config.json is to define the configuration details for development, test, and production.

#### passport.js

The purpose of passport.js is to use the passport dependency, passport-local dependency, and mdoels directory to allow the user to login to the application. Passport.js takes in the user's email address and password. If there is no email inside the database, "incorrect email" is returned to the user. If the password doesn't match the email, "incorrect password" is returned to the user. If the password and email matches, the user is able to login. In order to help keep authentication state across HTTP requests, sequelize needs to serialize and deserialize the user.

### models

The models directory is used to hold class files that processes database operations.

#### index.js

#### user.js

### public

The public directory is used to hold files that users of the application will see and interact with.

#### js

The js directory is used to hold script files that the users of the application will interact with.

##### login.js

The login.js provides functionality to the login.html page. It uses DOM manipulation and jQuery as a library to connect the elements that needs to be manipulated.

The file begins by creating variables to elements that would me manipulated. An event listener is used after the user enters in the email and password. If the login is successful, the user will go to the members page.

##### members.js

The members.js file gets the request from the user to figure out which user is login and then updates the HTMl on the page based on the member's name. jQuery is used as a library and this page is connected to members.html.

##### signup.js

The purpose of signup.js is to provide functionality to signup.html so the user can create an account. The script files begins by assigning variables to elements being manipulated. Once the user fills out the email and password form, there is an event listener for submitting the information. The event listener trims the white space of the inputs and validates that the inputs are not empty. Next, the signUpUser function is called and a post request is made with the input. If the post is successful, the user is redirected to the members page. If it fails, the error will be alerted to the user. jQuery is used as a library for this script for a more convenient code.

#### stylesheets

The stylesheets directory is to hold css files that the users of the apllicaition will see.

##### style.css

The purpose of style.css is to give styling to the html files. This file is providing a 50px margin from the top on the signup and login form.

#### login.html

This is the HTML file the user would go to login. This file is style through style.css and bootstrap. It is also powered by the login.js file for functionality. The jQuery library is connected for more convenient code as well.

Inside this page, the user can enter in their email address and password to login. If the user does not have a login, the user can click on the sign up link.

#### members.html

After the user logins, the user will enter the this member.html page. In the navbar, the user can logout by clicking the logout link. The page also welcomes the user in the header of the page.

There is a isAuthenticated.js middleware that prevents users to directly access this link without first logging in. This html file is connected to style.css and bootstrap for styling. It is also connected to members.js to provide functionality and the jQuery library is used for convient code.

#### signup.html

If the user does not have an account and wants to sign up, the user will go to this page. The user will be able to enter in an email and password to sign up for an account. The user can also go back to the login page if the user already has an account by clicking on "or login here."

This file is styled by bootstrap and style.css. The signup.js file gives it functionality. The jQuery library is used for convient code.

### routes

The routes directory contains the different javascript files that supports the requests.

#### api-routes.js

This routes supports requests for APIs. It requires the models folder and the passport script file inside config. It allows users to signup for their account when they enter in their email address and password. This will be added to the database. There is also a validator to validate the information the user entered to meet the login criteria. There is a logout route and a route where the user can get back their email address and id after being logged in.

#### html-routes.js

This routes supports get requets for "/", "/members", and "/login." The path is being required for redirecting and isAuthenticated is being required to check if the user is login. If the user is login, they will be redirected to the "/members" page when they go to "/" or "/login." If the user doesn't have an account, they will be directed to the the login page. There is an authentification middlewar so the user can't access "/members" without being login and will be redirected to the signup page.

### .gitignore

The purpose of .gitignore is for git to ignore certain files inside of it. Node_modules and package-lock.json are ignored because it saves memory and the files can easily be installed with the command "npm install." .DS_Store is ignored because it can cause conflict for mac users depending on their directory settings.

### LICENSE

The purpose of the LICENSE is to allow the user to know what permission they have with using the software. For this application, the MIT LICENSE is used.

### package.json

The purpose of package.json is to the metadata for the application. It holds multiple dependencies that can be used through running "npm install" in the command the line. The dependenices for this package.json file includes bcryptjs, express, express-session, mysql2, passport, passport-local, and sequelize.

### README.md

The purpose of the README file is to provide information on how users can use the Passport Authentication application. It contains the description, tutorial, installation, technologies, dependencies, credits, and license for the app.

### server.js

The server.js is the file that is going to be run to access the application. This file is dependent on the dependencies "express", "express-session", and "passport". This file is dependent on the files inside the direcotry "models" and the directory "routes." The server.js file connects to the port and syncs to the database. It uses middleware to access the request and response objects.

## Changes

## Installation

## Technologies

- HTML
- CSS
- Javascript
- Node.js

## Dependencies

- bcryptjs
- express
- express-session
- mysql2
- passport
- passport-local
- sequelize

## Credits

David Anusontarangkul

[LinkedIn](https://www.linkedin.com/in/anusontarangkul/)
[Github](https://github.com/anusontarangkul)

This project is apart of the UC Berkeley Coding Bootcamp.

## License

Copyright <2020> <Anusontarangkul>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

End license text.
