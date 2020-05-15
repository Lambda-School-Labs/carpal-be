const client = require("../config/twilio");

function addNumber(user) {
    client.validationRequests
        .create({
            friendlyName: `${user.first_name} ${user.last_name}`,
            phoneNumber: `+1${user.phone_number}`
        })
        .then((result) => console.log("Phone Number savaed"))
        .catch((err) => console.log("Error added phone number"));
}

module.exports = addNumber;
