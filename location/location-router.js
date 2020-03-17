const { Models } = require("../Classes/Models");
const { FavoriteLocations } = require("../Classes/FavoriteLocations");
const express = require("express");

const router = express.Router();

const { verifyToken, validateUserToken } = require("../Middleware/auth");

//new locations DB class
const locations = new Models("locations");

//new favorite locations DB class
const FaveLocations = new FavoriteLocations();

router.get("/", async (req, res, next) => {
    try {
        res.json(await locations.findAll());
    } catch (err) {
        next(err);
    }
});

router.get(
    "/favorites",
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            res.json(await FaveLocations.getFavorites(req.user.id));
        } catch (err) {
            next(err);
        }
    }
);

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

module.exports = router;
