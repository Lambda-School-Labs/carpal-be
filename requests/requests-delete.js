const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.delete("/:id", async (req, res, next) => {
    try {
        const req_id = req.params.req_id;
        res.status(200).json(await requests.delete(req_id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
