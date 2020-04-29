const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");
const { validateRiderId } = require('../Middleware/auth');
const requests = new Requests();
// changed user.id to req.rider.id to be specific about the user updating the ride. 
router.put("/", validateRiderId(), async (req, res, next) => {
    try {
        const requestBody = {
            status: req.body.status
        };
        res.status(200).json(
            await requests.update(req.ride.id, req.rider.id, requestBody)
        );
    } catch (err) {
        next(err);
    }
});

module.exports = router;
