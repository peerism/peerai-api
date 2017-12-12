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
        email: 'luke@schoen.com',
        password: '123456',
        name: 'Luke',
        skills: [firstSkill] 
      },
      {
        email: 'nathan@waters.com',
        name: 'Nathan',
        password: '123456',
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
