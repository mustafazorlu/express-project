var express = require("express");
var router = express.Router();
const config = require("../config/index.js");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express", config: config });
});

module.exports = router;
