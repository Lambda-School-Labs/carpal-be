exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("saved_rides")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("saved_rides").insert([
                {
                    ride_id: 1,
                    user_id: 1
                },
                {
                    ride_id: 2,
                    user_id: 2
                }
            ]);
        });
};
