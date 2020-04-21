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
            .select("u.id as userId", "l.lat", "l.long", "f.name");
    }

    getSpecificFavorite(user_id, location_id) {
        return db(`${this.name} as f`)
            .join("users as u", "u.id", "f.user_id")
            .join("locations as l", "l.id", "f.location_id")
            .where({ "u.id": user_id, "l.id": location_id })
            .first("f.name", "l.lat as lat", "l.long as long");
    }

    async add(user_id, location_id, name = "") {
        const [addedLocation] = await db(this.name)
            .insert({
                user_id,
                location_id,
                name
            })
            .returning("*");
        return addedLocation;
    }

    //join tables won't create a normal id so we pass in the exact object we want to delete
    delete(user_id, location_id) {
        return db(this.name).where({ user_id, location_id }).del();
    }

    async update(user_id, name, items) {
        await db(this.name)
            .where({ user_id, name })
            .update(items)
            .returning("*");
        return this.getSpecificFavorite(user_id, items.location_id);
    }
}

module.exports = { FavoriteLocations };
