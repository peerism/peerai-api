const Person = require('./Person');
const Skill = require('./Skill');

let firstSkill = Skill.create(
  {
    skill: 'Ethereum'
  }
)

Person.create(
    [
      {
        name: 'Luke',
        skills: [firstSkill] 
      },
      {
        name: 'Nathan',
        skills: [firstSkill]
      }
    ]
  )
  .then((people) => {
    console.log('Created people: ', people);
    process.exit();
  })
  .catch((error) => {
    console.error('Error creating people: ', error);
    process.exit();
  })
