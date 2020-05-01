const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.get("/all", async (req, res, next) => {
    try {
        res.json(await requests.findAll().where({ ride_id: req.user.id }));
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        res.json(await requests.getSpecificRequest(req.ride.id, req.user.id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
