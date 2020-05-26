const { Requests } = require("../Classes/requests");

const requests = new Requests();

function addDriverDetails() {
    return async (req, res, next) => {
        try {
            console.log(req.body.ride_id)
            const driver = await requests.getDriverDetails(req.body.ride_id);


            req.driver = driver;
            next();
        } catch (err) {
            next(err);
        }
    };
}

module.exports = addDriverDetails;
