const authRouter = require("./auth");

const setUpRoutes = (server) => {
  server.use("/auth", authRouter);
};

module.exports = {
  setUpRoutes,
};
