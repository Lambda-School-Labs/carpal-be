exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("audio")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("audio").insert([
                { name: "country" },
                { name: "rock" },
                { name: "metal" }
            ]);
        });
};
