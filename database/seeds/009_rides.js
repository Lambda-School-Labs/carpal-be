exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("rides")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("rides").insert([
                {
                    driver_id: 1,
                    start_location_id: 1,
                    end_location_id: 2,
                    status: "pending"
                },
                {
                    driver_id: 2,
                    start_location_id: 2,
                    end_location_id: 1,
                    status: "accepted"
                },
                {
                    driver_id: 1,
                    start_location_id: 3,
                    end_location_id: 4,
                    status: "accepted"
                },
                {
                    driver_id: 2,
                    start_location_id: 1,
                    end_location_id: 3,
                    status: "pending"
                },
                {
                    driver_id: 1,
                    start_location_id: 5,
                    end_location_id: 1,
                    status: "accepted"
                },
                {
                    driver_id: 3,
                    start_location_id: 6,
                    end_location_id: 3,
                    status: "pending"
                },
                {
                    driver_id: 2,
                    start_location_id: 7,
                    end_location_id: 8,
                    status: "accepted"
                },
                {
                    driver_id: 3,
                    start_location_id: 1,
                    end_location_id: 6,
                    status: "pending"
                },
                {
                    driver_id: 1,
                    start_location_id: 8,
                    end_location_id: 7,
                    status: "accepted"
                },
                {
                    driver_id: 2,
                    start_location_id: 1,
                    end_location_id: 4,
                    status: "pending"
                }
            ]);
        });
};
