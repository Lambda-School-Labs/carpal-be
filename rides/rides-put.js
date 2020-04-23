const express = require("express");
const router = express.Router();
const { Rides } = require("../Classes/rides");

const rides = new Rides("rides");

router.put("/:id", async (req, res, next) => {
    try {
        res.status(200).json({ message: "put endpoint hit" });
        // res.status(201).json(await rides.update(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
