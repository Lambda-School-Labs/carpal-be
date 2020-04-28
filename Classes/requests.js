// const db = require("../database/db-config");
const { Models } = require("./models");
const db = require("../database/db-config");

class Requests extends Models {
    constructor(name) {
        super(name);
        this.name = "rides_riders";
    }

    //join table functions
    getSpecificRequest(ride_id, rider_id) {
        return db(this.name).where({ ride_id, rider_id }).first();
    }

    delete(ride_id, rider_id) {
        return db(this.name).where({ ride_id, rider_id }).del();
    }

    async update(ride_id, rider_id, items) {
        await db(this.name)
            .where({ ride_id, rider_id })
            .update(items)
            .returning("*");
        return this.getSpecificRequest(ride_id, rider_id);
    }
}

module.exports = { Requests };
