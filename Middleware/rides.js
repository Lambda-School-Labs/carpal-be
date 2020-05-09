const { Rides } = require("../Classes/rides");
const { Users } = require("../Classes/users");
const rides = new Rides();
const users = new Users();

// create user rider_id validation
function validateRiderId() {
    return async (req, res, next) => {
        try {
            const user = await users.findBy({ id: req.params.rider_id });
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
        try {
            const ride = await rides.findBy({ id: req.body.ride_id });
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
            const details = await rides.getRideDetail(req.body.request_id);
            if (details) {
                req.ride_details = details;
                next();
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
