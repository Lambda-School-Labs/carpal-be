const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");

const rides = new Rides();

router.post("/", async (req, res, next) => {
    try {
        const requestBody = {
            rider_id: req.body.rider_id,
            start_location_id: req.body.start_location_id,
            end_location_id: req.body.end_location_id
        };
    } catch (err) {
        next(err);
    }
});

module.exports = router;
