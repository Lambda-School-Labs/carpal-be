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

    async update(ride_id, rider_id, status) {
        await db(this.name)
            .where({ ride_id, rider_id })
            .update({ status: status })
            .returning("*");
        return this.getSpecificRequest(ride_id, rider_id);
    }
    async findAllBy(filter) {
        return db(this.name).where(filter)
    }
}

module.exports = { Requests };
