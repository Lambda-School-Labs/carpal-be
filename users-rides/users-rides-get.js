const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");

const rides = new Rides();

router.get("/", async (req, res, next) => {
    try {
        res.json(await rides.findAll().where({ driver_id: req.user.id }));
    } catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const ride = await rides.findBy({
            id: req.params.id,
            driver_id: req.user.id
        });
        if (!ride || ride.length < 1) {
            res.status(404).json({
                message: "ride id not found for current user"
            });
        }
        res.json(ride);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
