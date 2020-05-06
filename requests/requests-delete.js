const express = require("express");
const router = express.Router();
const { Requests } = require("../Classes/requests");

const requests = new Requests();

router.delete("/:id", async (req, res, next) => {
    try {
        const deleteRes = await requests.delete(req.params.id);
        res.status(204).json(deleteRes);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
