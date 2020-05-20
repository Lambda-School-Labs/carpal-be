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

const requestLocationCheck = () => {
    return async (req, res, next) => {
        try {
            const startLocation = await locations.findBy({
                lat: req.body.rider_start_lat,
                long: req.body.rider_start_long
            });

            const endLocation = await locations.findBy({
                lat: req.body.rider_end_lat,
                long: req.body.rider_end_long
            });

            if (startLocation) {
                req.rider_start = startLocation;
            } else {
                const start = await locations.add({
                    lat: req.body.rider_start_lat,
                    long: req.body.rider_start_long
                });

                req.rider_start = start;
            }

            if (endLocation) {
                req.rider_end = endLocation;
            } else {
                const end = await locations.add({
                    lat: req.body.rider_end_lat,
                    long: req.body.rider_end_long
                });

                req.rider_end = end;
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = {
    locationCheck,
    checkBody,
    requestLocationCheck
};
