const db = require("../models");
const Links = db.links;
const Crypto = require('crypto')
const URL = require("url").URL;
const randomString = ( size = 11)  => {  
    return uniqueString = Crypto
      .randomBytes(size)
      .toString('base64')
      .slice(0, size)
      .replace(/[^a-zA-Z ]/g, "i")
}

const stringIsAValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (err) {
      return false;
    }
};

// Create and Save a new Link
exports.encode = (req, res) => {

    if (!req.body.original_link) {
        return res.status(422).json({
            message: 'The original link key is required'
        })
    }

    if (! stringIsAValidUrl(req.body.original_link)) {
        return res.status(422).json({
            message: 'The URL must be a valid one !!!'
        })
    }

  const link = {
    original_link: req.body.original_link,
    shortened_link: randomString(),
  };

  // Save link in the database
  Links.create(link)
    .then(data => {
      return res.json({
          message : "Link successfully created",
          data : data
        });
    })
    .catch(err => {
      return res.status(500).json({
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
        return res.json({
          message : "Link successfully decoded",
          data : data.original_link
        });
      })
      .catch(err => {
        return res.status(500).json({
          message:
            err.message || "Some error occurred while decoding link."
        });
      });

};

// Find a single Link with an id
exports.findLinkStatistic = (req, res) => {

    const encodedLinkData = {
        shortened_link : req.params.shortened_link
    }

    Links.findOne({
        where: encodedLinkData
      })
      .then(data => {
        return res.json({
          message : "Link data successfully retrieved",
          data : data
        });
      })
      .catch(err => {
        return res.status(500).json({
          message:
            err.message || "Some error occurred while decoding link."
        });
      });
};

// Retrieve all Links from the database.
exports.findAll = (req, res) => {

    Links.findAll()
    .then(data => {
      return res.json({
        message : "Links successfully retrieved",
        data : data
      });
    })
    .catch(err => {
      return res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

//Redirect to the original URL
exports.redirectShortLink = (req, res) => {

    console.log( randomString() )

    const encodedLinkData = {
        shortened_link : req.params.shortened_link
    }

    Links.findOne({
        where: encodedLinkData
      })
      .then(data => {
          if(!data) {
            return res.status(404).json({
                message:
                   "This route doesn't exist"
              });
          }


          data.update({
              counter: data.counter+1
          })

            return res.redirect(data.original_link)
        })
      .catch(err => {
        return res.json({
          message:
            err.message || "An error occurred while decoding link."
        });
      });

};

