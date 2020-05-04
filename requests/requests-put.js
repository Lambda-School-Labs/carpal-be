const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");
const requests = new Requests();

router.put("/", async (req, res, next) => {
    try {
        res.status(200).json(
            await requests.update(req.body.ride_id, req.body.rider_id, req.body.status)
        );
    } catch (err) {
        next(err);
    }
});

module.exports = router;
