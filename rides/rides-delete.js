const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");
const { validateRideId } = require("../Middleware/auth");

const rides = new Rides();

router.delete("/:id", validateRideId(), async (req, res, next) => {
    try {
        const ride_id = req.params.id;
        res.status(200).json(await rides.delete(ride_id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
