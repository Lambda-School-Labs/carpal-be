const db = require("../database/db-config");
const { Models } = require("./Models");

class FavoriteLocations extends Models {
    constructor(name) {
        super(name);
        //hard code value to db since we won't be changing it
        this.name = "favorite_locations";
    }
    getFavorites(user_id) {
        return db(`${this.name} as f`)
            .join("locations as l", "l.id", "f.location_id")
            .join("users as u", "u.id", "f.user_id")
            .where({ "u.id": user_id })
            .select(
                "u.id as userId",
                "l.name",
                "l.name",
                "l.address",
                "l.city",
                "l.state",
                "l.zip_code"
            );
    }
    async add(user_id, location_id) {
        const [addedLocation] = await db(this.name)
            .insert({
                user_id,
                location_id
            })
            .returning("*");
        return addedLocation;
    }
}

module.exports = { FavoriteLocations };
