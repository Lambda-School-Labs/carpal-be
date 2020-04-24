exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("rides_riders")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("rides_riders").insert([
                {
                    ride_id: 1,
                    user_id: 1,
                    status: "pending"
                },
                {
                    ride_id: 2,
                    user_id: 2,
                    status: "confirmed"
                },
                {
                    ride_id: 2,
                    user_id: 3,
                    status: "declined"
                }
            ]);
        });
};
