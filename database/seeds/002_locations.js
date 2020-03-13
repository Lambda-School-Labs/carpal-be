
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        { id: 1, name: 'home', address: '4239 longfoot way', zip_code: 95135, city: 'san jose', state: 'ca' },
        { id: 2, name: 'work', address: '50 fremont street', zip_code: 94150, city: 'san francisco', state: 'ca' },
        { id: 3, name: 'gym', address: '224 Frazee rd', zip_code: 92058, city: 'oceanside', state: 'ca' }
      ]);
    });
};
