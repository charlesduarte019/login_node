
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 'ca4e7c60',
          name: 'user00',
          password: '123456',
          email: 'user00@gmail.com',
          cellNumber: '12982264440',
          city: 'Barbalha',
          uf: 'CE',
          created_at: '2020-09-24 14:56:50.035',
          updated_at: '2020-09-24 14:56:50.035'
        },
        {
          id: 'ca4e7c61',
          name: 'user01',
          password: '123456',
          email: 'user01@gmail.com',
          cellNumber: '12982264440',
          city: 'Barbalha',
          uf: 'CE',
          created_at: '2020-09-24 14:56:50.035',
          updated_at: '2020-09-24 14:56:50.035'
        },
        {
          id: 'ca4e7c62',
          name: 'user02',
          password: '123456',
          email: 'user02@gmail.com',
          cellNumber: '12982264440',
          city: 'Barbalha',
          uf: 'CE',
          created_at: '2020-09-24 14:56:50.035',
          updated_at: '2020-09-24 14:56:50.035'
        },
        {
          id: 'ca4e7c63',
          name: 'user03',
          password: '123456',
          email: 'user03@gmail.com',
          cellNumber: '12982264440',
          city: 'Barbalha',
          uf: 'CE',
          created_at: '2020-09-24 14:56:50.035',
          updated_at: '2020-09-24 14:56:50.035'
        },
        {
          id: 'ca4e7c64',
          name: 'user04',
          password: '123456',
          email: 'user04@gmail.com',
          cellNumber: '12982264440',
          city: 'Barbalha',
          uf: 'CE',
          created_at: '2020-09-24 14:56:50.035',
          updated_at: '2020-09-24 14:56:50.035'
        }
      ]);
    });
};