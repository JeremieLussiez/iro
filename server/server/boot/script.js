const server = require('../server');
const {admins} = require('../setup/admins');
const {
  gaugeMessage,
  rainbowMessage,
} = require('../setup/messages');

const {
  Role,
  RoleMapping,
} = server.models;
const User = server.models.user;
const Message = server.models.message;

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

function generateMessages() {

}

Role.findOne({
  where: {
    name: 'admin'
  }
}).then((adminRole => {
  return adminRole
})).then(adminRole => {
  if (adminRole !== null) {
    return adminRole;
  }
  return Role.create({
    name: 'admin',
  });
}).then(adminRole => {
  User.find({
    where: {
      or: admins.map(admin => {
        return {
          username: admin.username
        };
      }),
    },
  }).then((users) => {
    admins.forEach((adminToCreate) => {
      if (!users.find(user => user.username === adminToCreate.username)) {
        console.log('Creating', adminToCreate.username, 'with', adminToCreate.password, 'as password...');
        User.create(adminToCreate, (err, createdAdmin) => {
          if (err) throw err;
          adminRole.principals.create({
            principalType: RoleMapping.USER,
            principalId: createdAdmin.id,
          });
        });
      }
    });
  });
});

Message.create(gaugeMessage);
Message.create(rainbowMessage);
