const client = require("../config/twilio");

async function addNumber(user) {
    try {
        const added = await client.validationRequests.create({
            friendlyName: `${user.first_name} ${user.last_name}`,
            phoneNumber: `+1${user.phone_number}`
        });
        return;
    } catch (err) {
        return;
    }
}

module.exports = addNumber;
