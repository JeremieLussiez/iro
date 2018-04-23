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
  admins
};
