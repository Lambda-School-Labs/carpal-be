const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");
const { Requests } = require("../Classes/requests");
const { getRidersStart } = require("../Middleware/rides");

const rides = new Rides();
const requests = new Requests();

router.get("/", async (req, res, next) => {
    try {
        const userRides = await rides.getDetail()
        res.json(userRides.filter((ride) => { return ride.driver_id == req.user.id }))
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
        const requestsDetails = await requests.findAllBy({
            ride_id: req.params.id
        });
        const rideDetails = { ...ride, requests: requestsDetails };
        if (!ride || ride.length < 1) {
            res.status(404).json({
                message: "ride id not found for current user"
            });
        }
        res.json(rideDetails);
    } catch (err) {
        next(err);
    }
});

router.get("/riderStart/:id", getRidersStart(), async (req, res, next) => {
    try {
        const locations = {
            riderStops: req.riderStarts,
            driverRoute: req.locations
        };

        res.json(locations);
    } catch (err) {
        next(err);
    }
});
module.exports = router;
