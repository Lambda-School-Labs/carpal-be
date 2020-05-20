const db = require("../database/db-config");
const { Models } = require("./models");

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
            .select("f.id", "u.id as userId", "l.lat", "l.long", "f.name", "f.location_id");
    }

    getSpecificFavorite(id) {
        return db(`${this.name} as f`)
            .join("locations as l", "l.id", "f.location_id")
            .where({ "f.id": id })
            .first("f.id", "f.name", "l.lat as lat", "l.long as long");
    }

    async add(user_id, location_id, name) {
        const [addedLocation] = await db(this.name)
            .insert({
                user_id,
                location_id,
                name
            })
            .returning("*");
        return addedLocation;
    }
}

module.exports = { FavoriteLocations };
