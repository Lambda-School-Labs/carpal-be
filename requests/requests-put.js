const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");
const requests = new Requests();

router.put("/", async (req, res, next) => {
    try {
        const requestBody = {
            status: req.body.status
        };

        res.status(200).json(
            await requests.update(req.ride.id, req.user.id, requestBody)
        );
    } catch (err) {
        next(err);
    }
});

module.exports = router;
