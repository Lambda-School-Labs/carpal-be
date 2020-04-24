const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.post("/", async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
});

module.exports = router;
