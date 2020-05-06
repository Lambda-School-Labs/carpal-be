const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.delete("/", async (req, res, next) => {
    try {
        const deleteRes = await requests.delete(req.body.request_id);
        res.status(204).json(deleteRes);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
