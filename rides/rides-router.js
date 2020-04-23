const express = require("express");
const router = express.Router();
const ridesPut = require("./rides-put");
const ridesGet = require("./rides-get");
const ridesDelete = require("./rides-delete");
const ridesPost = require("./rides-post");

router.use("/", ridesPut);
router.use("/", ridesGet);
router.use("/", ridesDelete);
router.use("/", ridesPost);

module.exports = router;
