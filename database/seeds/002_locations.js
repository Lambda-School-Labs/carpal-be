exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("locations")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("locations").insert([
                // San Francisco locations (1-6)
                {
                    lat: 37.757532,
                    long: -122.388505
                },
                {
                    lat: 37.797132,
                    long: -122.413711
                },
                {
                    lat: 37.806426,
                    long: -122.4318
                },
                {
                    lat: 37.797259,
                    long: -122.406067
                },
                {
                    lat: 37.770069,
                    long: -122.446911
                },
                {
                    lat: 37.754665,
                    long: -122.446676
                },
                // other locations (7-8)
                {
                    lat: 39.779447,
                    long: -105.186582
                },
                {
                    lat: 39.778351,
                    long: -105.054163
                }
            ]);
        });
};
