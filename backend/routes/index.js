var express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/",()=>{
    res.json({message:"server fetched"});
})
module.exports = router;
