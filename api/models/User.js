const mongoose = require('./init');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const passportLocalMongoose = require('passport-local-mongoose');

const SkillRef = {
  type: ObjectId, ref: 'Skill'
}

const UserSchema = Schema({
  name: String,
  skills: [{ skill: SkillRef }]
});

// Plugin to add Passport email/password credentials to the UserSchema
// and adds Passport methods including `register`
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email', // Override login field to be email instead
  usernameLowerCase: true, // Ensure all emails are lowercase
  session: true // Disable session cookies since we will use JWTs
})

const User = mongoose.model('User', UserSchema);

module.exports = User;