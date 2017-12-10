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

* Run server then open client in browser
  ```
  yarn run dev;
  open -a "Google Chrome" http://localhost:7000
  ```

## Log <a id="chapter-log"></a>

* Initial setup
  ```
  git init; touch README.md; touch .gitignore; mkdir server client;
  code .;
  ```
  * [Add boilerplate contents to .gitignore for Node.js](https://github.com/github/gitignore/blob/master/Node.gitignore)
* Setup server
  ```
  cd server; yarn init -y; 
  yarn add express body-parser;
  yarn add nodemon --dev;
  touch server.js;
  ```
* Add boilerplate contents to server/server.js
* Add scripts section to server/package.json

## FAQ <a id="chapter-faq"></a>

* TBC

## References <a id="chapter-references"></a>

* Express.js server API with JWT authorisation

## TODO <a id="chapter-todo"></a>

* [ ] - TBC