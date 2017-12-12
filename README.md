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

* Run server then open client in browser, then seed the database
  ```
  yarn run drop; yarn run dev;
  yarn run seed;

* Run client to send request to server and receive response
  * Option 1 - cURL
    ```
    curl -i GET http://localhost:7000
    curl -v -X POST http://localhost:7000/users --data '[{"email":"gavin@wood.com", "name":"Gavin"}]' -H "Content-Type: application/json"
    curl -v -X POST http://localhost:7000/users -d "email=gavin@wood.com&name=Gavin" -H "Content-Type: application/x-www-form-urlencoded"
    ```
    * Register
      ```
      curl -v -X POST http://localhost:7000/users/auth/register -d "email=luke@schoen.com&password=123456&name=Luke" -H "Content-Type: application/x-www-form-urlencoded"
      curl -v -X POST http://localhost:7000/users/auth/register -d '{"email":"gavin@wood.com", "password":"123456", "name":"Gavin"}' -H "Content-Type: application/json"
      ```
    * Sign in as User to get Cookie in the response (i.e. `< set-cookie: connect.sid=s%3A0lvji3Qe2qiHzTgyrhT8gN0-DpLBylws.AAS6WJprRAgw5cI7mbZNN0Vl7r4TAFRnbpTZDqHPQc4; Path=/; HttpOnly`)
      ```
      curl -v -X POST http://localhost:7000/users/auth -d "email=luke@schoen.com&password=123456" -H "Content-Type: application/x-www-form-urlencoded"
      curl -v -X POST http://localhost:7000/users/auth -d '{"email":"gavin@wood.com", "password":"123456"}' -H "Content-Type: application/json"
      ```
    * Access an area of the site that requires authorisation by providing the Cookie in the Headers. Response is 200 when authorized and 403 when not authorized.
      ```
      curl -v -i GET http://localhost:7000/users -H "Content-Type: application/json" --cookie "connect-sid=s%3A0lvji3Qe2qiHzTgyrhT8gN0-DpLBylws.AAS6WJprRAgw5cI7mbZNN0Vl7r4TAFRnbpTZDqHPQc4"
      ```
  * Option 2 - Web browser
    ```
    open -a "Google Chrome" http://localhost:7000
    ```

* Drop the database
  ```
  yarn run drop;
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
* Enable Sessions
* Add Cookies
  ```
  yarn add express-session cookie-parser
  ```

## FAQ <a id="chapter-faq"></a>

* TBC

## References <a id="chapter-references"></a>

* [Express.js server API with JWT authorisation](https://www.youtube.com/watch?v=ggv3rnaHuK8)

## TODO <a id="chapter-todo"></a>

* [ ] TBC