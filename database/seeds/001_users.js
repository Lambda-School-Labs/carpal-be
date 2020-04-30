const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function () {
            // Inserts seed entries
            return knex("users").insert([
                {
                    first_name: "dang",
                    last_name: "lu",
                    email: "dang@carpal.com",
                    password: bcrypt.hashSync("abc123", 10),
                    is_driver: true,
                    phone_number: 7602242913,
                    zip_code: 92008,
                    is_admin: false,
                    is_disabled: false,
                    bio: "blah blah blah",
                    profile_picture:
                        "https://i.pinimg.com/236x/e5/ad/af/e5adaf64cefe5fe20a50df19b372579d--mike-judge-adult-cartoons.jpg"
                },
                {
                    first_name: "daniel",
                    last_name: "martin",
                    email: "daniel@carpal.com",
                    password: bcrypt.hashSync("xyz789", 10),
                    is_driver: true,
                    phone_number: 4153339932,
                    zip_code: 94150,
                    is_admin: false,
                    is_disabled: false,
                    bio: "blah2 blah2 blah2",
                    profile_picture:
                        "https://lh3.googleusercontent.com/proxy/47AigSqlyWzDoRjI49sizWOHAC9PMjCLRNY-DjAnGRLFfeyHI2gD8BHeuPuA_aDsxgGneOJdJ2kx2X5uDVrVBGKrULF2i7Cpd-hqOzz5Jv2IgNAAbs1oaBUGAm8OLw"
                },
                {
                    first_name: "Lesley",
                    last_name: "banadzem",
                    email: "lesley@carpal.com",
                    password: bcrypt.hashSync("mnop456", 10),
                    is_driver: true,
                    phone_number: 3104453333,
                    zip_code: 92123,
                    is_admin: false,
                    is_disabled: false,
                    bio: "blah3 blah3 blah3",
                    profile_picture:
                        "https://vignette.wikia.nocookie.net/p__/images/8/80/Moe_Szyslak.png/revision/latest/top-crop/width/360/height/450?cb=20150830111531&path-prefix=protagonist"
                }
            ]);
        });
};
