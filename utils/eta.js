const axios = require("axios");

let driverStart = "13.43, 52.51";
let riderStart = "13.42, 52.5";

function eta(driverStart, riderStart) {
    axios
        .get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${driverStart};${riderStart}?access_token=pk.eyJ1IjoiY2FycGFsIiwiYSI6ImNrNzZ2d2E2ZjAxZXkzbHFoamVrODRkOXgifQ.4WqV3ntXJEq7X8L2ea1fHw`
        )
        .then((res) => {
            let rideETA = res.routes.duration / 60;
            console.log(rideETA);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = eta;
