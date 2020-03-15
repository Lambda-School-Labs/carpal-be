const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");
const { Models } = require("../ModelClass/Models");

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
