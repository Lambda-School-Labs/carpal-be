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

app.get("/", function(req, res) {
    res.json({
        message: "Welcome Carpalers"
    });
});

app.use("/auth", authRouter);
app.use("/locations", locationRouter);

if (!module.parent) {
    app.listen(PORT, function() {
        console.log(`App listening to http://${HOST}:${PORT}`);
    });
}

module.exports = app;
