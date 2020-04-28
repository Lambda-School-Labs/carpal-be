const { Models } = require("../Classes/models");

const locations = new Models("locations");

const locationCheck = () => {
    return async (req, res, next) => {
        try {
            const location = await locations.findBy({
                lat: req.body.lat,
                long: req.body.long
            });
            if (location) {
                req.location = location;
                next();
            } else {
                const addedLocation = await locations.add({
                    lat: req.body.lat,
                    long: req.body.long
                });

                if (addedLocation) {
                    req.addedLocation = addedLocation;
                    next();
                }
            }
        } catch (err) {
            next(err);
        }
    };
};

const checkBody = () => {
    return async (req, res, next) => {
        try {
            if (!req.body.lat || !req.body.long) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" });
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = {
    locationCheck,
    checkBody
};
