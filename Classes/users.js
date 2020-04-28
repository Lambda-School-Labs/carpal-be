const bcrypt = require("bcryptjs");
const db = require("../database/db-config");
const { Models } = require("./models");

class Users extends Models {
    constructor(name) {
        super(name);
        //hard code value to db since we won't be changing it
        this.name = "users";
    }

    //we don't want to return a users' password on a successful add
    findById(id) {
        return db(this.name)
            .where({ id })
            .first(
                "id",
                "first_name",
                "last_name",
                "email",
                "is_driver",
                "phone_number",
                "zip_code",
                "is_admin",
                "is_disabled",
                "bio",
                "profile_picture"
            );
    }

    //Override add method in Models to return everything but password and hash password before inserting
    async add(item) {
        item.password = bcrypt.hashSync(item.password, 12);
        const [newUser] = await db(this.name).insert(item).returning("id");
        return this.findById(newUser);
    }
    //Override the findAll method in Models to avoid returning all users' passwords back
    findAll() {
        return db(this.name).select(
            "id",
            "first_name",
            "last_name",
            "email",
            "is_driver",
            "phone_number",
            "zip_code",
            "is_admin",
            "is_disabled",
            "bio",
            "profile_picture"
        );
    }
}

module.exports = { Users };
