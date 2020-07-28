const express = require("express");
const router = express.Router();

//homePage route
router.get("/",function(req,res){
    res.send("this is homePage");
});

module.exports = router;