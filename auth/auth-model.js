const db = require("../database/db-config");
const bcrypt = require("bcryptjs");

function findUsersById(id) {
    return db("users").where({ id });
}

function addUser(payload) {
    payload.password = bcrypt.hashSync(payload.password, 10);
    return db("users")
        .insert(payload)
        .returning([
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "zip_code",
            "bio",
            "profile_picture",
            "is_driver",
            "is_disabled",
            "is_admin"
        ]);
}

function findBy(filter) {
    return db("users")
        .where(filter)
        .select("id", "email", "password");
}

module.exports = {
    findBy,
    findUsersById,
    addUser
};
