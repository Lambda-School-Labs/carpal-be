
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('favorite_locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorite_locations').insert([
        { user_id: 1, location_id: 3 },
        { user_id: 2, location_id: 3 },
        { user_id: 3, location_id: 2 }
      ]);
    });
};
