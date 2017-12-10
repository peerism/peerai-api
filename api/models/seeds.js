const User = require('./User');
const Skill = require('./Skill');

let firstSkill = Skill.create(
  {
    skill: 'Ethereum'
  }
)

User.create(
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
  .then((users) => {
    console.log('Created users: ', users);
    process.exit();
  })
  .catch((error) => {
    console.error('Error creating users: ', error);
    process.exit();
  })
