const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");
const { validateRideId } = require("../Middleware/auth");

const rides = new Rides();

router.delete("/", validateRideId(), async (req, res, next) => {
    try {
        const ride_id = req.body.ride_id;
        res.status(204).json(await rides.delete(ride_id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
