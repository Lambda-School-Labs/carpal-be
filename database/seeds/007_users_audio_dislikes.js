exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("users_audio_dislikes")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("users_audio_dislikes").insert([
                { user_id: 1, audio_id: 1 },
                { user_id: 1, audio_id: 2 },
                { user_id: 3, audio_id: 1 }
            ]);
        });
};
