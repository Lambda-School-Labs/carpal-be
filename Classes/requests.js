const { Models } = require("./models");
const db = require("../database/db-config");

class Requests extends Models {
    constructor(name) {
        super(name);
        this.name = "rides_riders";
    }

    //join table functions
    getSpecificRequest(id) {
        return db(this.name).where({ id }).first();
    }

    async update(ride_id, id, status) {
        await db(this.name)
            .where({ ride_id, id })
            .update({ status: status })
            .returning("*");
        return this.getSpecificRequest(id);
    }

    async getByDriver(driver_id) {
        return db(`${this.name} as req`)
            .join("rides as r", "r.id", "req.ride_id")
            .join("users as u", "u.id", "req.rider_id")
            .where({ "r.driver_id": driver_id })
            .whereNot({ "req.status": "declined" })
            .select(
                "req.id",
                "r.id as ride_id",
                "req.rider_id",
                "u.first_name as rider_name",
                "req.status"
            );
    }

    async getByRider(rider_id) {
        return db(`${this.name} as req`)
            .join("rides as r", "r.id", "req.ride_id")
            .join("users as u", "u.id", "r.driver_id")
            .where({ "req.rider_id": rider_id })
            .select(
                "req.id",
                "u.id as driver_id",
                "u.first_name as driver_name",
                "r.id as ride_id",
                "req.status"
            );
    }

    async getDriverDetails(ride_id) {
        return db("rides as r")
            .join("users as u", "u.id", "r.driver_id")
            .where({ "r.id": ride_id })
            .first(
                "r.id as ride_id",
                "u.first_name as driver_name",
                "u.phone_number as driver_number"
            );
    }

    async findAllBy(filter) {
        return db(this.name).where(filter);
    }
}

module.exports = { Requests };
