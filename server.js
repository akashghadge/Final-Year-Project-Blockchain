"use strict";
// inital set up of server
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;


// must needed packages
const cros = require("cors");
app.use(cros());


// for production use
app.use(express.static("build"));
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})


app.listen(port, () => {
    console.log("Server is listening on port ", port);
}) 