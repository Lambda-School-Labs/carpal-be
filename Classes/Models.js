const db = require("../database/db-config");
const bcrypt = require("bcryptjs");

class Models {
    constructor(name) {
        //add db name dynamically when initialized
        this.name = name;
    }

    findBy(filter) {
        return db(this.name)
            .where(filter)
            .first();
    }

    findAll() {
        return db(this.name).select("*");
    }

    async add(item) {
        const [location] = await db(this.name)
            .insert(item)
            .returning("*");
        return location
    }

    update(id, item) {
        return db(this.name)
            .where({ id })
            .update(item)
            .returning("*");
    }

    delete(id) {
        return db(this.name)
            .where({ id })
            .del();
    }
}

module.exports = { Models };
