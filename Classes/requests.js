// const db = require("../database/db-config");
const { Models } = require("./models");

class Requests extends Models {
    constructor(name) {
        super(name);
        this.name = "rides_riders";
    }
}

module.exports = { Requests };
