const db = require("../database/db-config");
const { Models } = require("./models");

class Rides extends Models {
    constructor(name) {
        super(name);
        this.name = "rides";
    }

    async getDetail() {
        const rides = await db('rides').select("*");
        const ridesDetail = await Promise.all(rides.map(async (ride)=>{
            const start_location = await db('locations').where({id: ride.start_location_id}).first();
            const end_location = await db('locations').where({id: ride.end_location_id}).first();
            return ride = {...ride, start_location, end_location}
        }))
        return ridesDetail
    }
}

module.exports = { Rides };
