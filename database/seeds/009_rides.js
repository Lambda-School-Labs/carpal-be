exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("rides")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("rides").insert([
                {
                    driver_id: 1,
                    rider_id: 2,
                    start_location_id: 1,
                    end_location_id: 2,
                    status: "pending"
                },
                {
                    driver_id: 2,
                    rider_id: 1,
                    start_location_id: 2,
                    end_location_id: 1,
                    status: "accepted"
                }
            ]);
        });
};
