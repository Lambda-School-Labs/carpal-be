const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");

const rides = new Rides();

router.post("/", async (req, res, next) => {
    try {
        const requestBody = {
            start_location_id: req.body.start_location_id,
            end_location_id: req.body.end_location_id,
            driver_id: req.user.id
        };

        res.status(201).json(await rides.add(requestBody));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
