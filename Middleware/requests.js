const { Requests } = require("../Classes/requests");

const requests = new Requests();

function addDriverDetails() {
    return async (req, res, next) => {
        try {
            const driver = await requests.getDriverDetails(req.body.ride_id);

            req.driver = driver;
            console.log(req.driver);
            next();
        } catch (err) {
            next(err);
        }
    };
}

module.exports = addDriverDetails;
