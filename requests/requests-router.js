const express = require("express");
const router = express.Router();
const requestsPut = require("./requests-put");
const requestsGet = require("./requests-get");
const requestsDelete = require("./requests-delete");
const requestsPost = require("./requests-post");

router.use("/", requestsPut);
router.use("/", requestsGet);
router.use("/", requestsDelete);
router.use("/", requestsPost);

module.exports = router;
