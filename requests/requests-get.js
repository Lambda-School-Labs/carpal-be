const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.get("/", async (req, res, next) => {
    try {
        res.json(await requests.findAll().where({ ride_id: req.ride.id }));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
