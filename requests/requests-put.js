const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");
const requests = new Requests();
const client = require("../config/twilio");

router.put("/", async (req, res, next) => {
    try {
        if (
            req.body.status.match(
                /\b(\w*approved|confirm(|ed)|accepted\w*)\b/gi
            )
        ) {
            client.messages.create({
                body: `Your ride has been confirmed with ${req.ride_details.driver_name}`,
                from: process.env.TWILIO_FROM_PHONE,
                to: `+1${req.ride_details.rider_phone_number}`
            });
        }
        res.status(200).json(
            await requests.update(
                req.body.ride_id,
                req.body.request_id,
                req.body.status
            )
        );
    } catch (err) {
        next(err);
    }
});

module.exports = router;
