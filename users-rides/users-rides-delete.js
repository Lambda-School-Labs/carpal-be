const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");
const { validateRideId } = require("../Middleware/rides");

const rides = new Rides();

router.delete("/:id", async (req, res, next) => {
    try {
        const ride_id = req.params.id;
        res.status(204).json(await rides.delete(ride_id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
