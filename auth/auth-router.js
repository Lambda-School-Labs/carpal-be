const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { jwtSecret } = require("../config/secrets");
const { Models } = require("../Classes/Models");
const { verifyToken, validateUserToken } = require("../Middleware/auth");

const users = new Models("users");

//Add catch for different type of missing request body
router.post("/register", async (req, res, next) => {
    try {
        const user = req.body;
        res.status(201).json(await users.add(user));
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await users.findBy({ email }).first();
        const passwordValid = bcrypt.compareSync(password, user.password);
        if (user && passwordValid) {
            const token = generateToken(user);
            res.status(200).json({ id: user.id, email: user.email, token });
        } else {
            res.status(401).json({ message: "unauthorized user" });
        }
    } catch (err) {
        next(err);
    }
});

router.get("/", verifyToken(), validateUserToken(), async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (err) {
        next(err);
    }
});

//GOOGLE AUTH

router.get('/google', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'https://www.letscarpal.com' }),
    function (req, res) {

        res.redirect('https://www.letscarpal.com');
    });



router.put('/update', verifyToken(), validateUserToken(), async (req, res, next) => {
    try {
        const user_id = req.user.id
        const payload = req.body
        res.json(await users.update(user_id, payload))
    }
    catch (err) {
        next(err)
    }
})

router.delete('/delete', verifyToken(), validateUserToken(), async (req, res, next) => {
    try {
        const user_id = req.user.id
        res.json(await users.delete(user_id))
    }
    catch (err) {
        next(err)
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        email: user.email
    };
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
