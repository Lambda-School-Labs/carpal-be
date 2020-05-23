const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");
const addDriverDetails = require("../Middleware/requests");
const { twilioDriver, eta } = require("../Middleware/twilio");
const { requestLocationCheck } = require("../Middleware/locations");

const requests = new Requests();

router.post(
    "/",
    requestLocationCheck(),
    addDriverDetails(),
    twilioDriver(),
    async (req, res, next) => {
        try {
            const requestBody = {
                ride_id: req.body.ride_id,
                rider_id: req.user.id,
                status: req.body.status,
                rider_start_location_id: req.rider_start.id,
                rider_end_location_id: req.rider_end.id
            };

            res.status(201).json(await requests.add(requestBody));
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
