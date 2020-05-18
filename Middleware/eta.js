const axios = require("axios");

function eta(driverStart, riderStart) {
    let driverStart = "13.43, 52.51";
    let riderStart = "13.42, 52.5";

    return async (req, res, next) => {
        axios
            .get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${driverStart};${riderStart}?access_token=pk.eyJ1IjoiY2FycGFsIiwiYSI6ImNrNzZ2d2E2ZjAxZXkzbHFoamVrODRkOXgifQ.4WqV3ntXJEq7X8L2ea1fHw`
            )
            .then((res) => {
                //takes route duration in seconds, converts it to minutes and then rounds it
                let rideETA = Math.round(res.routes.duration / 60);
                console.log(rideETA);
            })
            .catch((err) => {
                console.log(err);
                next();
            });
    };
}

module.exports = { eta };
