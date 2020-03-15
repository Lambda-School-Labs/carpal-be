
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('audio').del()
    .then(function () {
      // Inserts seed entries
      return knex('audio').insert([
        { id: 1, name: 'country' },
        { id: 2, name: 'rock' },
        { id: 3, name: 'metal' }
      ]);
    });
};
