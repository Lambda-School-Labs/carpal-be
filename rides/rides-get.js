const express = require("express");
const router = express.Router();
const { Models } = require("../Classes/models")
const { Rides } = require("../Classes/rides");

const rides = new Rides();

router.get("/", async (req, res, next) => {
    try {
        res.json(await rides.findAll());
    } catch (err) {
        next(err);
    }
});

module.exports = router;
