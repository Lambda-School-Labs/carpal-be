const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();
// update req.user.id to req.body.rider_id to match front end.
router.post("/", async (req, res, next) => {
    try {
        const requestBody = {
            ride_id: req.ride.id,
            rider_id: req.body.rider_id,
            status: req.body.status
        };

        res.status(201).json(await requests.add(requestBody));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
