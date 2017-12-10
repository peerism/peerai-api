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
  yarn run dev;
  yarn run seed;

* Run client to send request to server and receive response
  * Option 1 - cURL
    ```
    curl -i GET http://localhost:7000
    curl -v -X POST http://localhost:7000/people --data '[{"name":"Gavin"}]' -H "Content-Type: application/json"
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
  touch models/Person.js;
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
  db.people.find({})
  db.skills.find({})
  ```

* Create routes
  ```
  mkdir routes
  ```
* Modify server.js. Add routes/people.js

## FAQ <a id="chapter-faq"></a>

* TBC

## References <a id="chapter-references"></a>

* Express.js server API with JWT authorisation

## TODO <a id="chapter-todo"></a>

* [ ] - TBC