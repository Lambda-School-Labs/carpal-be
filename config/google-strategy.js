const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { Users } = require('../Classes/Users')
const pwGenerator = require('generate-password')


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

const UserClass = new Users()

module.exports = passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/"
},
    async function (accessToken, refreshToken, profile, done) {
        const user = {
            id: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile._json.email,
            provider: profile.provider,
            password: pwGenerator.generate({
                length: 12,
                uppercase: true,
                lowercase: true,
                symbols: true
            })
        };
        const userExist = await UserClass.findBy({ id: user.id })
        if (userExist) {
            return done(null, user)
        } else {
            await UserClass.add(user)
            return done(null, user)
        }
    }
));

