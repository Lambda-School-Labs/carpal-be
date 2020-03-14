
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('hobbies').del()
    .then(function () {
      // Inserts seed entries
      return knex('hobbies').insert([
        { id: 1, name: 'sleeping' },
        { id: 2, name: 'video games' },
        { id: 3, name: 'biking' }
      ]);
    });
};
