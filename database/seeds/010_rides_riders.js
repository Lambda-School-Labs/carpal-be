exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("rides_riders")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("rides_riders").insert([
                {
                    ride_id: 1,
                    rider_id: 1,
                    status: "pending"
                },
                {
                    ride_id: 2,
                    rider_id: 2,
                    status: "confirmed"
                },
                {
                    ride_id: 2,
                    rider_id: 3,
                    status: "declined"
                }
            ]);
        });
};
