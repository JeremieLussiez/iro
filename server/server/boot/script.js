const server = require('../../server/server');

const {
  Role,
  RoleMapping,
} = server.models;
const User = server.models.user;

function pickOne(list) {
  return list[Math.round(Math.random() * (list.length - 1))];
}

function passwordGenerator(length) {
  let password = '';
  const consonants = 'zrtpqsdfghjklmwxcvbn';
  const vowels = 'aeyuio';
  for (let i = 0; i < length; i++) {
    password += `${pickOne(consonants)}${pickOne(vowels)}`;
  }
  password += Math.round(Math.random() * 9);
  return password;
}

User.find({
  where: {
    or: [
      {
        username: 'RPGWanderer',
      },
      {
        username: 'Loots',
      },
    ],
  },
}).then((users) => {
  ['Loots', 'RPGWanderer'].forEach((userToCreate) => {
    if (!users.find(user => user.username === userToCreate)) {
      console.log('Creating ', userToCreate);
    }
  });
}, (err) => {
  console.log(err);
});
/*
setInterval(() => {
  User.create([
    {
      username: passwordGenerator(5),
      email: `${passwordGenerator(5)}@gmail.com`,
      firstName: 'Bob',
      lastName: 'Ramon',
      password: 'opensesame',
    },
  ], (err, users) => {
    console.log(users);
  });
}, 2000);
*/
/*
User.create([
  {
    username: 'RPGWanderer',
    email: 'jeremie.lussiez@gmail.com',
    firstName: 'Jérémie',
    lastName: 'Lussiez',
    password: 'opensesame',
  },
], (err, users) => {
  if (err) throw err;
  Role.create({
    name: 'admin',
  }, (err, role) => {
    if (err) throw err;
    role.principals.create({
      principalType: RoleMapping.USER,
      principalId: users[0].id,
    }, (err, principal) => {
      if (err) throw err;
    });
  });
});
*/
