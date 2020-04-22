const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");

const rides = new Rides();

router.get("/", async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
});

module.exports = router;
