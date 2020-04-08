exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("locations")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("locations").insert([
                // {
                //     name: "home",
                //     address: "4239 longfoot way",
                //     zip_code: 95135,
                //     city: "san jose",
                //     state: "ca"
                // },
                // {
                //     name: "work",
                //     address: "50 fremont street",
                //     zip_code: 94150,
                //     city: "san francisco",
                //     state: "ca"
                // },
                // {
                //     name: "gym",
                //     address: "224 Frazee rd",
                //     zip_code: 92058,
                //     city: "oceanside",
                //     state: "ca"
                // }
                {
                    lat:39.385348651562, 
                    long: -99.797763874469
                },
                {
                    lat:34.386328485303,
                    long:-117.545965011690
                }
            ]);
        });
};
