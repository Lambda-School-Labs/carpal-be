const jwt = require("jsonwebtoken");
const { Users } = require("../Classes/users");

const { jwtSecret } = require("../config/secrets");
const { UserDetails } = require("../Classes/user-details");
const users = new Users();

const audioLikes = new UserDetails("audio", "users_audio_likes");
const audioDislikes = new UserDetails("audio", "users_audio_dislikes");
const hobby = new UserDetails("hobbies", "users_hobbies");

const verifyToken = () => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, jwtSecret);
            if (token && decoded) {
                req.decoded = decoded;
                next();
            } else {
                return res
                    .status(401)
                    .json({ message: "You are not authorized" });
            }
        } catch (err) {
            next(err);
        }
    };
};

const validateUserToken = () => {
    return async (req, res, next) => {
        const id = req.decoded.subject;
        if (id) {
            const user = await users.findBy({ id });
            const userHobbies = await hobby.findByUser(id);
            const users_audio_dislikes = await audioDislikes.findByUser(id);
            const users_audio_likes = await audioLikes.findByUser(id);

            if (user) {
                req.user = {
                    ...user,
                    hobbies: [...userHobbies],
                    audioDislikes: [...users_audio_dislikes],
                    audioLikes: [...users_audio_likes]
                };
                next();
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } else {
            return res.status(401).json({ message: "You are not authorized" });
        }
    };
};

function validateLoginReqBody() {
    return (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Email or Password is undefined"
            });
        } else {
            next();
        }
    };
}
function validateRegisterReqBody() {
    return (req, res, next) => {
        const { email, password, first_name, last_name } = req.body;
        if (!email || !password || !first_name || !last_name) {
            return res.status(400).json({
                message: "Fill in all required fields"
            });
        } else {
            next();
        }
    };
}

function userExist() {
    return async (req, res, next) => {
        const { email, password } = req.body;
        const user = await users.findBy({ email });

        if (user) {
            req.data = {
                exist: true,
                user
            };
            next();
        } else {
            req.data = {
                user: user
            };
            next();
        }
    };
}

module.exports = {
    verifyToken,
    validateUserToken,
    validateLoginReqBody,
    userExist,
    validateRegisterReqBody
};
