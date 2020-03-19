exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("hobbies")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("hobbies").insert([
                { name: "sleeping" },
                { name: "video games" },
                { name: "biking" }
            ]);
        });
};
