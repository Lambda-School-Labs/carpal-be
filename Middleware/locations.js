const { Models } = require("../Classes/Models");

const locations = new Models("locations");

const locationCheck = () => {
    return async (req, res, next) => {
        try {
            const location = await locations.findBy({
                address: req.body.address,
                zip_code: req.body.zip_code
            });
            if (location) {
                req.location = location;
                next();
            } else {
                const addedLocation = await locations.add(req.body);

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
            if (
                !req.body.address ||
                !req.body.zip_code ||
                !req.body.city ||
                !req.body.state ||
                !req.body.name
            ) {
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
