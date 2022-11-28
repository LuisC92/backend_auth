const authRouter = require("express").Router();
const { checkEmail } = require("../middlewares/auth");
const Users = require("../controllers/users");
//! route to create new user
authRouter.post("/signin", checkEmail, Users.createUser);

//! route for login

module.exports = authRouter;
