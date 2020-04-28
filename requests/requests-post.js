const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.post("/", async (req, res, next) => {
    try {
        const requestBody = {
            status: req.body.status
        };

        res.status(201).json(await requests.add(requestBody));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
