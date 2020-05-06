const { Rides } = require("../Classes/rides");
const { Users } = require("../Classes/users");
const rides = new Rides();
const users = new Users();

// create user rider_id validation
function validateRiderId() {
    return async (req, res, next) => {
        const user = await users.findBy({ id: req.params.rider_id });
        try {
            if (user) {
                req.rider = user;
                next();
            } else {
                res.status(404).json({ message: "Rider not found" });
            }
        } catch (error) {
            next(error);
        }
    };
}

function validateRideId() {
    return async (req, res, next) => {
        const ride = await rides.findBy({ id: req.body.ride_id });
        try {
            if (ride) {
                req.ride = { ...ride };
                next();
            } else {
                res.status(404).json({ message: "Ride not found" });
            }
        } catch (error) {
            next(error);
        }
    };
}

function getRideDetail() {
    return async (req, res, next) => {
        try {
            if (!req.body.request_id) {
                next();
            } else {
                const details = await rides.getRideDetail(req.body.request_id);
                if (details) {
                    console.log(details);
                    req.ride_details = details;
                    next();
                }
            }
        } catch (err) {
            next(err);
        }
    };
}

module.exports = {
    validateRideId,
    validateRiderId,
    getRideDetail
};
