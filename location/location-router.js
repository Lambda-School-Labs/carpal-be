const { Models } = require("../ModelClass/Models");
const express = require("express");

const router = express.Router();

const locations = new Models("locations");

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
router.post("/", async (req, res, next) => {
    try {
        res.status(201).json(await locations.add(req.body));
    } catch (err) {
        next(err);
    }
});

//needs middleware validation for req.body and id
router.put("/:id", async (req, res, next) => {
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
