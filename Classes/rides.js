const db = require("../database/db-config");
const { Models } = require("./models");

class Rides extends Models {
    constructor(name) {
        super(name);
        this.name = "rides";
    }

    async getDetail() {
        const rides = await db("rides").select("*");
        const ridesDetail = await Promise.all(
            rides.map(async (ride) => {
                const name = await db("users")
                    .where({ id: ride.driver_id })
                    .first();
                const start_location = await db("locations")
                    .where({ id: ride.start_location_id })
                    .first();
                const end_location = await db("locations")
                    .where({ id: ride.end_location_id })
                    .first();
                return (ride = {
                    ...ride,
                    driver_name: name.first_name,
                    start_location,
                    end_location
                });
            })
        );
        return ridesDetail;
    }

    async getRideDetail(req_id) {
        return db(`${this.name} as r`)
            .join("users as u", "u.id", "r.driver_id")
            .join("rides_riders as rr", "rr.ride_id", "r.id")
            .join("users as ru", "ru.id", "rr.rider_id")
            .join("locations as el", "el.id", "r.end_location_id")
            .join("locations as sl", "sl.id", "r.start_location_id")
            .where({ "rr.id": req_id })
            .first(
                "u.first_name as driver_name",
                "ru.first_name as rider_name",
                "ru.phone_number as rider_phone_number",
                "el.lat as end_lat",
                "el.long as end_long",
                "sl.lat as start_lat",
                "sl.long as start_long"
            );
    }

    async getRideLocations(id) {
        return db(`${this.name} as r`)
            .join("locations as sl", "sl.id", "r.start_location_id")
            .join("locations as el", "el.id", "r.end_location_id")
            .where({ "r.id": id })
            .select(
                "r.id",
                "sl.lat as start_lat",
                "sl.long as start_long",
                "el.lat as end_lat",
                "el.long as end_long"
            );
    }
}

module.exports = { Rides };
