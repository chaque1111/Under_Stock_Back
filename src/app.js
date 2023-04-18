const express = require("express");
const cors = require("cors");
const server = express();

const routes = require("./routes/index.js");
server.name = "under_ok";
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

server.use(cors(corsOptions));
server.use("/", routes);

module.exports = server;
