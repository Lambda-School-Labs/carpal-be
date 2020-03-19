exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("users_hobbies")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("users_hobbies").insert([
                { user_id: 1, hobby_id: 2 },
                { user_id: 2, hobby_id: 3 },
                { user_id: 3, hobby_id: 1 }
            ]);
        });
};
