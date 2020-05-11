const express = require("express");
const authRouter = require("./auth/auth-router");
const locationRouter = require("./location/location-router");
const usersRouter = require("./users/users-router");
const usersRidesRouter = require("./users-rides/users-rides-router");
const ridesRouter = require("./rides/rides-router");
const requestsRouter = require("./requests/requests-router");
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";
const { verifyToken, validateUserToken } = require("./Middleware/auth");
const profile = require("./storage/profile-img-upload-post");

const app = express();

const cors = require("cors");
const helmet = require("helmet");

//Middlewaress
app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: "*"
    })
);
app.enable("trust proxy");

app.get("/", function (req, res) {
    res.json({
        message: "Welcome Carpalers"
    });
});

app.use("/auth", authRouter);
app.use("/locations", verifyToken(), validateUserToken(), locationRouter);
app.use("/users", verifyToken(), validateUserToken(), usersRouter);
app.use("/users/rides", verifyToken(), validateUserToken(), usersRidesRouter);
app.use("/rides", verifyToken(), validateUserToken(), ridesRouter);
app.use("/rides/requests", verifyToken(), validateUserToken(), requestsRouter);
app.use("/profile", profile);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "internal error" });
});

if (!module.parent) {
    app.listen(PORT, function () {
        console.log(`App listening to http://${HOST}:${PORT}`);
    });
}

module.exports = app;
