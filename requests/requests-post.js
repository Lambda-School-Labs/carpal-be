const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");
const addDriverDetails = require("../Middleware/requests");
const { twilioDriver } = require("../Middleware/twilio");

const requests = new Requests();

router.post("/", addDriverDetails(), twilioDriver(), async (req, res, next) => {
    try {
        const requestBody = {
            ride_id: req.ride.id,
            rider_id: req.user.id,
            status: req.body.status
        };

        res.status(201).json(await requests.add(requestBody));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
