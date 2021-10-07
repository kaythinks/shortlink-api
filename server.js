
const express = require("express");

const cors = require("cors");

let corsOptions = {
    origin: "*"
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to bezkoder application." });
});

app.get("/api", (req, res) => {
    res.status(200).json({
        message : "Welcome to the ShortLink API"
    })
});

app.get('*', function(req, res){
    res.status(404).json({
        message:"This route doesn't exis't"
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
