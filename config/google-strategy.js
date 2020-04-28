const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { Users } = require("../Classes/users");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

const UserClass = new Users();

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/auth/google/callback/${process.env.GOOGLE_ENV}`
    },
    async function (accessToken, refreshToken, profile, done) {
        const user = {
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile._json.email,
            provider_id: profile.id,
            password: bcrypt.hashSync(
                `${profile.name.familyName}${profile.name.givenName}${profile.id}`,
                12
            )
        };
        const userExist = await UserClass.findBy({ email: user.email });
        if (userExist) {
            return done(null, user);
        } else {
            await UserClass.add(user);
            return done(null, user);
        }
    }
);
