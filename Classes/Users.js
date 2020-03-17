const bcrypt = require("bcryptjs");
const db = require("../database/db-config");
const { Models } = require("./Models");

class Users extends Models {
    constructor(name) {
        super(name);
        //hard code value to db since we won't be changing it
        this.name = "users";
    }
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
}

module.exports = { Users };
