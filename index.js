const express = require("express");
const authRouter = require("./auth/auth-router");
const locationRouter = require("./location/location-router");
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

const app = express();

const cors = require("cors");
const helmet = require("helmet");

//Middlewaress
app.use(express.json());
app.use(helmet());
app.use(cors());

app.enable('trust proxy');

app.use(express.session({
    secret : process.env.sessionSecret,
    key : 'sid',
    proxy : true, // add this when behind a reverse proxy, if you need secure cookies
    cookie : {
        secure : true,
    }
}));

app.get("/", function (req, res) {
    res.json({
        message: "Welcome Carpalers"
    });
});

app.use("/auth", authRouter);
app.use("/locations", locationRouter);

// app.use((err, req, res, next) => {
//     console.log(err)
//     res.status(500).json({ message: 'internal error' })
// })

if (!module.parent) {
    app.listen(PORT, function () {
        console.log(`App listening to http://${HOST}:${PORT}`);
    });
}

module.exports = app;
