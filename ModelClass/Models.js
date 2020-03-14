const db = require("../database/db-config");
const bcrypt = require("bcryptjs");

class Models {
    constructor(name) {
        this.name = name;
    }

    findBy(filter) {
        return db(this.name).where(filter).first();
    }
    
    findAll() {
        return db(this.name).select('*');
    }

    add(item) {
        if (this.name === "users") {
            item.password = bcrypt.hashSync(item.password, 12);
        }
        return db(this.name).insert(item).returning("*")
    }

    update(id, item) {
        return db(this.name).where({id}).update(item).returning("*");
    }

    delete(id){
        return db(this.name).where({id}).del();
    }
}

module.exports = { Models };