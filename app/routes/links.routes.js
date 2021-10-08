module.exports = app => {
    const links = require("../controllers/links.controller.js");
  
    var router = require("express").Router();

    // Create a new link
    router.post("/encode" ,links.encode);

    router.post("/decode", links.decode);
  
    router.get("/list", links.findAll);
  
    router.get("/statistic/:shortened_link", links.findLinkStatistic);
  
    app.use('/api', router);
  };