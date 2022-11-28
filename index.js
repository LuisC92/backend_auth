const express = require("express");
require("dotenv").config();
const server = express();
const { setUpRoutes } = require("./src/routes/index");

const port = process.env.PORT || 5000;

//* cookies

server.use(express.json());

setUpRoutes(server);

server.listen(port, () => {
  console.log("Server is running on port ", port);
});
