const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");
const { Requests } = require("../Classes/requests");

const rides = new Rides();
const requests = new Requests();

router.get("/", async (req, res, next) => {
    try {
        res.json(await rides.findAll().where({ driver_id: req.user.id }));
    } catch (err) {
        next(err);
    }
});
// need to await the requests and nest the object into the ride. 
// add findAllById to the requests model. all requests on a given ride. 
// making a quick not because i forgot to add you guys to the commit. sorry :)
router.get("/:id", async (req, res, next) => {
    try {
        const ride = await rides.findBy({
            id: req.params.id,
            driver_id: req.user.id
        });
        console.log(ride);
        const requestsDetails = await requests.findBy({
            ride_id: req.params.id
        })
        console.log(requestsDetails);
        const rideDetails = {...ride, requestsDetails}
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

module.exports = router;
