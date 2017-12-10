const mongoose = require('./init');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SkillRef = {
  type: ObjectId, ref: 'Skill'
}

const PersonSchema = Schema({
  name: String,
  skills: [{ skill: SkillRef }]
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;