const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");
const { validateRideId } = require("../Middleware/auth");

const rides = new Rides();

router.put("/:id", validateRideId(), async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const updatedRide = await rides.update(id, changes);
        res.status(200).json(updatedRide);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
