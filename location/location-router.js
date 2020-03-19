const { Models } = require("../Classes/Models");
const express = require("express");
const favoritesRouter = require("./favorite-locations");
const router = express.Router();
const { checkBody } = require("../Middleware/locations");
const { verifyToken, validateUserToken } = require("../Middleware/auth");

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
router.get(
    "/:id",
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            res.json(await locations.findBy({ id: req.params.id }));
        } catch (err) {
            next(err);
        }
    }
);

//needs middleware validation for req.body
router.post(
    "/",
    checkBody(),
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            res.status(201).json(await locations.add(req.body));
        } catch (err) {
            next(err);
        }
    }
);

//needs middleware validation for req.body and id
router.put(
    "/:id",
    checkBody(),
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            res.json(await locations.update(req.params.id, req.body));
        } catch (err) {
            next(err);
        }
    }
);

//needs middleware validation for valid ID
router.delete(
    "/:id",
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            res.json(await locations.delete(req.params.id));
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
