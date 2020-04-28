const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.delete("/", async (req, res, next) => {
    try {
        res.status(204).json(await requests.delete(req.ride.id, req.user.id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
