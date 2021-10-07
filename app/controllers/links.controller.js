const db = require("../models");
const Links = db.links;
const Op = db.Sequelize.Op;

const encodedLinkData = {
    shortened_link : req.params.shortened_link
}

// Create and Save a new Link
exports.encode = (req, res) => {

  // Create a Link
  const link = {
    original_link: req.body.original_link,
    shortened_link: req.body.shortened_link,
  };

  // Save link in the database
  Links.create(link)
    .then(data => {
      res.send({
          message : "Link successfully created",
          data : data
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the link."
      });
    });
};


//Decode the encoded link
exports.decode = (req, res) =>{

    const encodedLink = {
        shortened_link : req.body.shortened_link
    }

    Links.findOne({
        where: encodedLink
      })
      .then(data => {
        res.send({
          message : "Link successfully decoded",
          data : data.original_link
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while decoding link."
        });
      });

};

// Find a single Link with an id
exports.findLinkStatistic = (req, res) => {

    Links.findOne({
        where: encodedLinkData
      })
      .then(data => {
        res.send({
          message : "Link data successfully retrieved",
          data : data
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while decoding link."
        });
      });
};

// Retrieve all Links from the database.
exports.findAll = (req, res) => {

    Links.findAll()
    .then(data => {
      res.send({
        message : "Links successfully retrieved",
        data : data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

//Redirect to the original URL
exports.redirectShortLink = (req, res) => {

    Links.findOne({
        where: encodedLinkData
      })
      .then(data => {
        res.redirect(data.original_link)
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while decoding link."
        });
      });

};