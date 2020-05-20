const client = require("../config/twilio");
const axios = require("axios");
const { Models } = require("../Classes/models");

const locations = new Models("locations");

//Calculate eta between drivers start and rider pickup
function eta() {
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
    return async (req, res, next) => {
        try {
            const riderStart = req.start.long + "," + req.start.lat;

            const driverStartObj = await locations.findBy({
                id: req.body.start_location_id
            });
            const driverStart = driverStartObj.long + "," + driverStartObj.lat;

            const res = await axios.get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${driverStart};${riderStart}?access_token=${mapboxToken}`
            );
            let rideETA;
            if (res.data.routes[0].duration > 0) {
                rideETA = Math.round(res.data.routes[0].duration / 60);
            } else {
                rideETA = 0;
            }
            req.eta = rideETA;
            next();
        } catch (err) {
            next(err);
        }
    };
}

//Rider: driver ETA when ride starts
//(when driver clicks "Start Ride" in SavedRides)

function twilioRider() {
    return (req, res, next) => {
        if (req.numbers.length > 0) {
            const filtered = [...new Set(req.numbers)];
            filtered.forEach((cur) => {
                client.messages.create({
                    body: `Your ride has been confirmed. Your driver will be there in ${req.eta} minutes`,
                    from: process.env.TWILIO_FROM_PHONE,
                    to: `+1${cur}`
                });
            });

            next();
        } else {
            next();
        }
    };
}
//Driver: new ride requests with link to /requests
//(when rider clicks "Request" in RideFind)

function twilioDriver() {
    return (req, res, next) => {
        const driver_phone_number = req.driver.driver_number;
        if (driver_phone_number) {
            client.messages.create({
                body: `You have a new ride request! Check it out at https://www.letscarpal.com/requests`,
                from: process.env.TWILIO_FROM_PHONE,
                to: `+1${driver_phone_number}`
            });
            next();
        } else {
            next();
        }
    };
}

module.exports = { eta, twilioRider, twilioDriver };
