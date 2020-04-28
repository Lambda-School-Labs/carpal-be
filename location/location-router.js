const { Models } = require("../Classes/models");
const express = require("express");
const favoritesRouter = require("./favorite-locations-router");
const router = express.Router();
const { checkBody } = require("../Middleware/locations");

//new locations DB class
const locations = new Models("locations");

router.use("/favorites", favoritesRouter);

router.get("/", async (req, res, next) => {
    try {
        res.json(await locations.findAll());
    } catch (err) {
        next(err);
    }
});

//needs middleware validation for valid ID
router.get("/:id", async (req, res, next) => {
    try {
        res.json(await locations.findBy({ id: req.params.id }));
    } catch (err) {
        next(err);
    }
});

//needs middleware validation for req.body
router.post("/", checkBody(), async (req, res, next) => {
    try {
        res.status(201).json(await locations.add(req.body));
    } catch (err) {
        next(err);
    }
});

router.put("/:id", checkBody(), async (req, res, next) => {
    try {
        res.json(await locations.update(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
});

//needs middleware validation for valid ID
router.delete("/:id", async (req, res, next) => {
    try {
        res.json(await locations.delete(req.params.id));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
