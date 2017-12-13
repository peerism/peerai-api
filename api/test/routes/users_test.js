"use strict";

const chai = require('chai');
const expect = chai.expect;
const app = require('../../app');

const User = require('../../models/User');
const Skill = require('../../models/Skill');

chai.use(require('chai-http'));

describe("Users Routes API", function(done) {

  // Setup server for tests
  let server;
  const port = 7111;

  // Asynchronous
  before(function(done) {
    server = app.listen(port, done);
  });

  // Shut down server after the tests
  after(function(done) {
    server.close(done);
  });

  beforeEach(function(done) {

    let firstSkill = Skill.create({
      skill: 'Ethereum'
    });
    
    User.create({
      email: 'luke@schoen.com',
      password: '123456',
      name: 'Luke',
      skills: [firstSkill] 
    }, done);
  });

  afterEach(function(done) {
    User.remove({}, done);
  });

  // test the endpoints
  it("should return a list of users", function() {
    return chai.request(app)
      .get('/users')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        // expect(res.data).to.have.length(1);
      })
      // .catch((err) => {
      //   console.log('Error: ', err);
      // })
  })

  it("should create a user", function() {
    return chai.request(app)
      .post('/users/create')
      .field('email', 'a@b.com')
      .field('name', 'Luke')
      .then(function(res) {
        expect(res).to.have.status(201);
      })
  });
})