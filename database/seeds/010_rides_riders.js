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
                    status: "pending",
                    rider_start_location_id: 5,
                    rider_end_location_id: 4
                },
                {
                    ride_id: 2,
                    rider_id: 2,
                    status: "confirmed",
                    rider_start_location_id: 4,
                    rider_end_location_id: 6
                },
                {
                    ride_id: 2,
                    rider_id: 3,
                    status: "declined",
                    rider_start_location_id: 6,
                    rider_end_location_id: 3
                }
            ]);
        });
};
