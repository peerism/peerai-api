"use strict";

const chai = require('chai');
const expect = chai.expect;

const User = require('../../models/User');
const Skill = require('../../models/Skill');

describe("User Model", function() {
  it("should have a full name", function() {
    const user = new User({ email: 'a@b.com', name: 'Luke' });
    expect(user.fullName()).to.equal('Luke');
  })
})