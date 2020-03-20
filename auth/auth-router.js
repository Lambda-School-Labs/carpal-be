const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { jwtSecret } = require("../config/secrets");
const { Users } = require("../Classes/Users");
const { verifyToken, validateUserToken } = require("../Middleware/auth");
const googleStrat = require("../config/google-strategy");

const users = new Users();

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
    function(req, res) {
        res.redirect("https://www.letscarpal.com");
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
    function(req, res) {
        res.redirect("https://staging.d3ic1rxl46vguk.amplifyapp.com/");
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
    function(req, res) {
        const token = generateToken(req.user);
        res.cookie("auth", token);
        res.redirect("http://localhost:3000/");
    }
);

router.put(
    "/update",
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            const user_id = req.user.id;
            const payload = req.body;
            res.json(await users.update(user_id, payload));
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    "/delete",
    verifyToken(),
    validateUserToken(),
    async (req, res, next) => {
        try {
            const user_id = req.user.id;
            res.json(await users.delete(user_id));
        } catch (err) {
            next(err);
        }
    }
);

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
