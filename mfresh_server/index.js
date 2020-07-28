const express = require("express");

const bodyParser = require('body-parser');

var app = express();
app.listen(5050);
console.log("Server is listening 5050");

// register body-parser as middleware
//false:user querystring to parse data
app.use(bodyParser.urlencoded({extended: false}));

// statement of cross-domain
app.all("*",function(req,res,next){
    //set a domain name that allows cross-domain "means that any domain name is allowed to cross domain"
    res.header("Access-Control-Allow-Origin","*");
    //allowed heaer type
    res.header("Access-Control-Allow-Headers","content-type");
    //the way requests are allowed across domains
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //have the options try request end quickly
    else
        next();
  });

  //the introduction of the routing
  const userRouter = require("./route/user.js");
  const indexRouter = require("./route/index.js");
  const newsRouter = require("./route/news.js");
  const productRouter = require("./route/product.js");
  const cartRouter = require("./route/cart.js");

//  use routing
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/news",newsRouter);
app.use("/product",productRouter);
app.use("/cart",cartRouter);
