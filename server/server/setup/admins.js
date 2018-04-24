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

const admins = [
  {
    username: 'RPGWanderer',
    firstName: 'Jérémie',
    lastName: 'Lussiez',
    email: 'jeremie.lussiez@gmail.com',
    birthday: '1981-10-04T00:00:00.000Z',
    password: process.env.NODE_ENV === 'production' ? passwordGenerator(5) : 'iro',
  },
  {
    username: 'Lootss',
    firstName: 'Lucille',
    lastName: 'Dhaleine',
    email: 'lucille.dhaleine@gmail.com',
    birthday: '1991-12-06T00:00:00.000Z',
    password: process.env.NODE_ENV === 'production' ? passwordGenerator(5) : 'iro',
  }
];

module.exports = {
  admins,
};
