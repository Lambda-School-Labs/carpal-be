// const db = require("../database/db-config");
const { Models } = require("./models");

class Rides extends Models {
    constructor(name) {
        super(name);
        this.name = "rides";
    }
}

module.exports = { Rides };
