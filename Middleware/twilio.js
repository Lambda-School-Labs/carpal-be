const client = require("../config/twilio");
const axios = require("axios");

//Need Driver start location, rider location, rider phone number

//TODO - Can I use return value from one middleware in the next?
//TODO - Update request destructuing (and possible insert necessary DB calls)
//TODO - Add

//Calculate eta between drivers start and rider pickup
function eta() {
    return async (req, res, next) => {
        const { driverStart, riderStart } = req.body;
        console.log(driverStart, riderStart);
        await axios
            .get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${driverStart};${riderStart}?access_token=pk.eyJ1IjoiY2FycGFsIiwiYSI6ImNrNzZ2d2E2ZjAxZXkzbHFoamVrODRkOXgifQ.4WqV3ntXJEq7X8L2ea1fHw`
            )
            .then((res) => {
                //takes route duration in seconds, converts it to minutes and then rounds it
                let rideETA = Math.round(res.routes.duration / 60);
                console.log(rideETA);
                return riderETA;
                next();
            })
            .catch((err) => {
                console.log(err);
                next();
            });
    };
}

//Rider: driver ETA when ride starts
//(when driver clicks "Start Ride" in SavedRides)

function twilioRider() {
    return (req, res, next) => {
        const { rider_phone_number } = req.body;
        console.log(rider_phone_number);
        if (rider_phone_number) {
            client.messages.create({
                body: `Your ride has been confirmed. Your driver will be there in ${rideETA}`,
                from: process.env.TWILIO_FROM_PHONE,
                to: `+1${rider_phone_number}`
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
    return async (req, res, next) => {
        const { driver_phone_number } = req.body;
        console.log(driver_phone_number);
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
