const client = require("../config/twilio");
const rideETA = require("./eta");

console.log(rideETA);
function twilio(rideETA, rider_phone_number) {
    return async (req, res, next) => {
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

module.exports = { twilio };

// Rider: driver ETA when ride starts (when driver clicks "Start Ride" in SavedRides)

//Driver clicks start ride
//Middleware is fired
//Need Driver start location, rider location, rider phone number
//Calculate ETA base on start locations
//send eta via Text (Twilio)
