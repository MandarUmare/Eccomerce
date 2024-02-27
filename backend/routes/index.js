var express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", (req, res) => {
  res.send({ message: "server fetched" });
});
module.exports = router;
