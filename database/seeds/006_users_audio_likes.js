exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("users_audio_likes")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("users_audio_likes").insert([
                { user_id: 1, audio_id: 2 },
                { user_id: 2, audio_id: 3 },
                { user_id: 3, audio_id: 2 }
            ]);
        });
};
