# README

---
PEER-AI
---

# Table of Contents
  * [Quick Start Guide](#chapter-0)
  * [Log](#chapter-log)
  * [FAQ](#chapter-faq)
  * [TODO](#chapter-todo)
  * [References](#chapter-references)

## Quick Start Guide <a id="chapter-0"></a>

* Run MongoDB Server
  ```
  mongod
  ```

* Drop the server. Run server then try cURL requests
  ```
  yarn run drop; yarn run dev;
  ``` 

* Run client to send request to server and receive response
  * cURL
    * Register with email/password. JWT provided in response (i.e. `{"token":"xyz"}`)
      ```
      curl -v -X POST http://localhost:7000/users/auth/register -d "email=luke@schoen.com&password=123456&name=Luke" -H "Content-Type: application/x-www-form-urlencoded"
      curl -v -X POST http://localhost:7000/users/auth/register -d '{"email":"gavin@wood.com", "password":"123456", "name":"Gavin"}' -H "Content-Type: application/json"
      ```
    * Sign in with email/password. JWT provided in response (i.e. `{"token":"xyz"}`)
      ```
      curl -v -X POST http://localhost:7000/users/auth -d "email=luke@schoen.com&password=123456" -H "Content-Type: application/x-www-form-urlencoded"
      curl -v -X POST http://localhost:7000/users/auth -d '{"email":"gavin@wood.com", "password":"123456"}' -H "Content-Type: application/json"
      ```
    * Access a restricted endpoint by providing JWT
      ```
      curl -v -X GET http://localhost:7000/users -H "Content-Type: application/json" -H "Authorization: Bearer <INSERT_TOKEN>"
      ```
    * Create user by providing JWT
      ```
      curl -v -X POST http://localhost:7000/users/create --data '[{"email":"test@fake.com", "name":"Test"}]' -H "Content-Type: application/json" -H "Authorization: JWT <INSERT_TOKEN>"
      curl -v -X POST http://localhost:7000/users/create -d "email=test2@fake.com&name=Test2" -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: JWT <INSERT_TOKEN>"
      ```

* Run Tests on port 7111
  ```
  yarn run drop; yarn run test-watch
  ```

* Drop the database
  ```
  yarn run drop;
  ```

* Seed the database
  ```
  yarn run seed;
  ```

## Log <a id="chapter-log"></a>

* Initial setup
  ```
  git init; touch README.md; touch .gitignore; mkdir api web;
  code .;
  ```
  * [Add boilerplate contents to .gitignore for Node.js](https://github.com/github/gitignore/blob/master/Node.gitignore)

* Setup API
  ```
  cd api; yarn init -y; 
  yarn add express body-parser;
  yarn add nodemon --dev;
  touch server.js;
  ```
* Add boilerplate contents to api/server.js
* Add "dev" in "scripts" section of api/package.json

* Add Mongoose
  ```
  yarn add mongoose;
  mkdir models; touch models/init.js;
  touch models/User.js;
  touch models/seeds.js;
  touch models/drop.js
  ```

* Create Models for Mongoose
* Add boilerplate contents to models
* Add scripts to api/package.json

* Run MongoDB Server
  ```
  mongod
  ```

* MongoDB Client
  ```
  mongo

  show dbs
  use peerai
  show collections
  db.users.find({})
  db.skills.find({})
  ```

* Create routes
  ```
  mkdir routes
  ```
* Modify server.js. Add routes/users.js

* Add authentication with [Passport, Passport-Local, and Passport-Local-Mongoose](https://github.com/saintedlama/passport-local-mongoose):
  ```
  yarn add passport passport-local passport-local-mongoose
  ```
* Rename Person and people to User and users
* Add User Registration route
* Add User Sign in route
* Add JWT library to return a token instead of a user
  ```
  yarn add jsonwebtoken;
  ```
* Add Passport JWT library
  ```
  yarn add passport-jwt
  ```
* Add restricted endpoint that requires valid JWT to access
* Add Controllers https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
* Add Route Tests
  ```
  yarn add mocha chai chai-http --dev;
  mkdir -p test/routes;
  touch test/routes/users_test.js;
  ```
* Add Model Tests
  ```
  mkdir test/models;
  touch test/models/users_test.js
  ```

## FAQ <a id="chapter-faq"></a>

* How to understand how to use Passport JWT library?
  * Refer to the library codebase on Github or in node_modules/jsonwebtoken/ i.e. [verify.js](https://github.com/auth0/node-jsonwebtoken/blob/master/verify.js)
  * Use breakpoints
  * Experiment using Node. i.e. Run `node` then
    ```
    npm install jsonwebtoken

    const JWT = require('jsonwebtoken');
    JWT.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx0ZnNjaG9lbkBnbWFpbC5jb20iLCJpYXQiOjE1MTMwNjY3NTEsImV4cCI6MTUxMzY3MTU1MSwic3ViIjoiNWEyZjkwZmZiNTI5YjI0YzM5MTA1NWM3In0.MkcCR1YD2c21x_WOQObyY-UPAQDWTcooOiO69saUVMI")
    ```

## References <a id="chapter-references"></a>

* [Express.js server API with JWT authorisation](https://www.youtube.com/watch?v=ggv3rnaHuK8)
* [Express.js Routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

## TODO <a id="chapter-todo"></a>

* [ ] Integrate with Peerism React Native app
* [ ] Integrate Solidity smart contract using TestRPC