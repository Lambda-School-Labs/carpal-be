const { Rides } = require("../Classes/rides");
const { Users } = require("../Classes/users");
const { Requests } = require("../Classes/requests");
const rides = new Rides();
const users = new Users();
const requests = new Requests();

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

function rideStarted() {
    return async (req, res, next) => {
        try {
            if (req.body.status.match(/\b(\w*start(|ed)\w*)\b/gi)) {
                const requestDetails = await requests.findAllBy({
                    ride_id: req.body.ride_id,
                    status: "accepted"
                });

                rider_numbers = [];
                start = { lat: "", long: "" };
                end = { lat: "", long: "" };
                const details = await Promise.all(
                    requestDetails.map(async (cur) => {
                        const ride = await rides.getRideDetail(cur.id);
                        if (ride.rider_phone_number) {
                            rider_numbers.push(ride.rider_phone_number);
                        }
                        start.lat = ride.start_lat;
                        start.long = ride.start_long;
                        // end.lat = ride.end_lat;
                        // end.long = ride.end_long;
                        return cur;
                    })
                );

                req.start = start;
                req.end = end;
                req.numbers = rider_numbers;
                console.log(req.numbers);
                next();
            } else {
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
    getRideDetail,
    rideStarted
};
