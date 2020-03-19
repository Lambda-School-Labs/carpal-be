const bcrypt = require("bcryptjs");
const db = require("../database/db-config");
const { Models } = require("./Models");

class Users extends Models {
    constructor(name) {
        super(name);
        //hard code value to db since we won't be changing it
        this.name = "users";
    }

    //Override add method in Models to return everything but password and hash password before inserting
    add(item) {
        item.password = bcrypt.hashSync(item.password, 12);
        return db(this.name)
            .insert(item)
            .returning(
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
