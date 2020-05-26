const client = require("../config/twilio");
const axios = require("axios");
const { Models } = require("../Classes/models");

const locations = new Models("locations");

//Calculate eta between drivers start and rider pickup
function eta() {
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
    return async (req, res, next) => {
        try {
            // changed to array, since we will have multiple ETA's
            // syncing this up to the numbers is another story..
            const etas = await Promise.all(
                req.riders.map(async (cur) => {
                    const riderStart = `${cur.long},${cur.lat}`;

                    const driverStartObj = await locations.findBy({
                        id: req.body.start_location_id
                    });

                    const driverStart = `${driverStartObj.long},${driverStartObj.lat}`;

                    const result = await axios.get(
                        `https://api.mapbox.com/directions/v5/mapbox/driving/${driverStart};${riderStart}?access_token=${mapboxToken}`
                    );

                    let rideETA;
                    if (result.data.routes[0].duration > 0) {
                        rideETA = Math.round(
                            result.data.routes[0].duration / 60
                        );
                    } else {
                        rideETA = 5;
                    }
                    cur.eta = rideETA; // update the current eta

                    return cur;
                })
            );
            req.ETA = etas;
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
        if (req.riders.length > 0) {
            const filtered = [...new Set(req.riders)];
            filtered.forEach((cur) => {
                client.messages.create({
                    body: `Your ride has been confirmed. Your driver will be there in ${cur.eta} minutes`, // an attempt to sync number to ETA
                    from: process.env.TWILIO_FROM_PHONE,
                    to: `+1${cur.phone_number}`
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
