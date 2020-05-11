const express = require("express");
const router = express.Router();
const { verifyToken, validateUserToken } = require("../Middleware/auth");
const { FavoriteLocations } = require("../Classes/favorite-locations");
const { checkBody, locationCheck } = require("../Middleware/locations");
const { Models } = require("../Classes/models");

//new favorite locations DB class
const FaveLocations = new FavoriteLocations();

router.get("/", async (req, res, next) => {
    try {
        res.json(await FaveLocations.getFavorites(req.user.id));
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await FaveLocations.getSpecificFavorite(req.params.id));
    } catch (err) {
        next(err);
    }
});

//middleware check for address in locations DB
router.post("/", checkBody(), locationCheck(), async (req, res, next) => {
    try {
        if (req.addedLocation) {
            res.status(201).json(
                await FaveLocations.add(
                    req.user.id,
                    req.addedLocation.id,
                    req.body.name
                )
            );
        } else {
            res.status(201).json(
                await FaveLocations.add(
                    req.user.id,
                    req.location.id,
                    req.body.name
                )
            );
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        res.json(await FaveLocations.delete(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.put("/:id", checkBody(), locationCheck(), async (req, res, next) => {
    try {
        // if location had to be added to DB, update favorite location with updated location ID
        if (req.addedLocation) {
            res.json(
                await FaveLocations.update(req.params.id, {
                    location_id: req.addedLocation.id,
                    name: req.body.name
                })
            );
        } else {
            res.json(
                await FaveLocations.update(req.params.id, {
                    location_id: req.location.id,
                    name: req.body.name
                })
            );
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
