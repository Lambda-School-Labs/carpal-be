const client = require("../config/twilio");
const rideETA = require("./eta");

function twilio(rideETA, rider_phone_number) {
    return async (req, res, next) => {
        if (rider_phone_number) {
            client.messages.create({
                body: `Your ride has been confirmed. Your driver will be there in ${rideETA}`,
                from: process.env.TWILIO_FROM_PHONE,
                to: `+1${rider_phone_number}`
            });
        } else {
            next();
        }
    };
}

module.exports = { twilio };
