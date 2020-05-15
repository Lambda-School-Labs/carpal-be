const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { Users } = require("../Classes/users");
const {
    verifyToken,
    validateUserToken,
    validateLoginReqBody,
    userExist,
    validateRegisterReqBody
} = require("../Middleware/auth");
const googleStrat = require("../config/google-strategy");
const generateToken = require("../utils/generateToken");
const users = new Users();
const addNumber = require("../utils/twilioAddNumbers");

passport.use(googleStrat);

//needed for passport, have to be called for passport
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

//initialize passport
router.use(passport.initialize());

//Add catch for different type of missing request body
router.post(
    "/register",
    validateRegisterReqBody(),
    userExist(),
    async (req, res, next) => {
        try {
            const user = req.body;

            if (req.data.user) {
                return res.status(400).json({
                    message: `User already exist`
                });
            }
            const userObj = await users.add(user);

            if (userObj.phone_number !== 555555555) {
                addNumber(userObj);
            }

            const token = generateToken(userObj);

            res.status(201).json({ ...userObj, token });
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/login",
    validateLoginReqBody(),
    userExist(),
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            //Re-assign the user object to req.data. from the user exist middleware
            const user = req.data.user;

            if (!user) {
                return res.status(400).json({
                    message: `User with the email of ${email} doesn't not exist in the system.`
                });
            }
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
    }
);

router.get("/", verifyToken(), validateUserToken(), async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (err) {
        next(err);
    }
});

// maybe possible to make a function that generates a route depending on env, so we dont have unused routes in production

//GOOGLE AUTH

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["email", "profile"]
    })
);
//GOOGLE AUTH
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "https://www.letscarpal.com"
    }),
    function (req, res) {
        const token = generateToken(req.user);
        res.cookie("auth", token);
        res.redirect("https://www.letscarpal.com/login");
    }
);

//Staging front-end test
router.get(
    "/google/staging",
    passport.authenticate("google", {
        scope: ["email", "profile"]
    })
);
//Staging front-end test
router.get(
    "/google/callback/staging",
    passport.authenticate("google", {
        failureRedirect: "https://staging.d3ic1rxl46vguk.amplifyapp.com/"
    }),
    function (req, res) {
        const token = generateToken(req.user);
        res.cookie("auth", token);
        res.redirect("https://staging.d3ic1rxl46vguk.amplifyapp.com/login");
    }
);

//testing front-end test
router.get(
    "/google/testing",
    passport.authenticate("google", {
        session: false,
        scope: ["email", "profile"]
    })
);
//testing front-end test
router.get(
    "/google/callback/testing",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/"
    }),
    function (req, res) {
        const token = generateToken(req.user);
        res.cookie("auth", token);
        res.redirect("http://localhost:3000/login");
    }
);

module.exports = router;
