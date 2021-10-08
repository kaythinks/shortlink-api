
const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const { DB } = require("./app/config/db.config");

const links = require("./app/controllers/links.controller.js");

db.sequelize.sync()

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Shortlink API." });
});

app.get("/test", (req, res) => {
    res.status(200).json({
        message : "Welcome to the ShortLink API"
    })
});

app.get("/:shortened_link", links.redirectShortLink);


require("./app/routes/links.routes")(app);

app.get("*", (req, res) => {
    res.status(404).json({ message: "This route doesn't exist !!!." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8888;
app.listen(PORT, (err) => {
    if (err) console.log(err);

    console.log(`Server is running on port ${PORT}.`);
});
