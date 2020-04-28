const express = require("express");
const router = express.Router();
const { verifyToken, validateUserToken } = require("../Middleware/auth");
const { FavoriteLocations } = require("../Classes/favorite-locations");
const { checkBody, locationCheck } = require("../Middleware/locations");
const { Models } = require("../Classes/models");

//new favorite locations DB class
const FaveLocations = new FavoriteLocations();

const locationModel = new Models("locations");

router.get("/", verifyToken(), validateUserToken(), async (req, res, next) => {
    try {
        res.json(await FaveLocations.getFavorites(req.user.id));
    } catch (err) {
        next(err);
    }
});

//middleware check for address in locations DB
router.post(
    "/add",
    checkBody(),
    verifyToken(),
    validateUserToken(),
    locationCheck(),
    async (req, res, next) => {
        try {
            if (req.addedLocation) {
                res.status(201).json(
                    await FaveLocations.add(req.user.id, req.addedLocation.id)
                );
            } else {
                res.status(201).json(
                    await FaveLocations.add(req.user.id, req.location.id)
                );
            }
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    "/delete/:id",
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            res.json(await FaveLocations.delete(req.params.id));
        } catch (err) {
            next(err);
        }
    }
);

router.put(
    "/update/:id",
    checkBody(),
    locationCheck(),
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            //update in locations DB
            res.json(await locationModel.update(req.params.id, req.body));
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
