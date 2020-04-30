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

    async getByDriver(driver_id) {
        return db(`${this.name} as req`)
            .join("rides as r", "r.id", "req.ride_id")
            .join("users as u", "u.id", "req.rider_id")
            .where({ "r.driver_id": driver_id })
            .select("req.rider_id", "u.first_name as rider_name", "req.status");
    }
}

module.exports = { Requests };
