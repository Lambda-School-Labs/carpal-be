const express = require("express");
const router = express.Router();
const requestsPut = require("./requests-put");
const requestsGet = require("./requests-get");
const requestsDelete = require("./requests-delete");
const requestsPost = require("./requests-post");
const { validateRideId } = require("../Middleware/auth");

router.use("/", validateRideId(), requestsPut);
router.use("/", requestsGet);
router.use("/", validateRideId(), requestsDelete);
router.use("/", validateRideId(), requestsPost);

module.exports = router;
