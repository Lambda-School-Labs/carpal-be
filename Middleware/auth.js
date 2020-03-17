const jwt = require('jsonwebtoken')
const { Models } = require('../ModelClass/Models')
const { jwtSecret } = require('../config/secrets')

const users = new Models('users')

const verifyToken = () => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, jwtSecret);
            if (token && decoded) {
                req.decoded = decoded;
                next();
            } else {
                return res.status(401).json({ message: "You are not authorized" });
            }
        } catch (err) {
            next(err);
        }
    }
}

const validateUserToken = () => {
    return async (req, res, next) => {
        const id = req.decoded.subject;
        if (id) {
            const user = await users.findBy({ id });
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } else {
            return res.status(401).json({ message: "You are not authorized" });
        }
    }
}


module.exports = {
    verifyToken,
    validateUserToken
}