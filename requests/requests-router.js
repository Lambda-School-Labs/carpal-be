const express = require("express");
const router = express.Router();
const requestsPut = require("./requests-put");
const requestsGet = require("./requests-get");
const requestsDelete = require("./requests-delete");
const requestsPost = require("./requests-post");
const { validateRideId, getRideDetail } = require("../Middleware/rides");

router.use("/", requestsGet);
router.use("/", requestsDelete);
router.use("/", validateRideId(), requestsPost);
router.use("/", validateRideId(), getRideDetail(), requestsPut);

module.exports = router;
