const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.get("/rider", async (req, res, next) => {
    try {
        res.json(await requests.getByRider(req.user.id));
    } catch (err) {
        next(err);
    }
});

router.get("/driver", async (req, res, next) => {
    try {
        res.json(await requests.getByDriver(req.user.id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
