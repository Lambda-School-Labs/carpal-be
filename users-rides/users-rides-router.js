const express = require("express");
const router = express.Router();
const ridesPut = require("./users-rides-put");
const ridesGet = require("./users-rides-get");
const ridesDelete = require("./users-rides-delete");
const ridesPost = require("./users-rides-post");

router.use("/", ridesPut);
router.use("/", ridesGet);
router.use("/", ridesDelete);
router.use("/", ridesPost);

module.exports = router;
