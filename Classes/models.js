const db = require("../database/db-config");

class Models {
    constructor(name) {
        //add db name dynamically when initialized
        this.name = name;
    }

    findBy(filter) {
        return db(this.name).where(filter).first();
    }

    findAll() {
        return db(this.name).select("*");
    }

    async add(item) {
        const [addedItem] = await db(this.name).insert(item).returning("*");
        return addedItem;
    }

    async update(id, item) {
        await db(this.name).where({ id }).update(item).returning("*");
        return this.findBy({ id });
    }

    delete(id) {
        return db(this.name).where({ id }).del();
    }
}

module.exports = { Models };
