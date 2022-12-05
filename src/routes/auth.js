const authRouter = require("express").Router();
const { checkEmail, createNewEmail } = require("../middlewares/auth");
const Users = require("../controllers/users");
//! route to create new user
//* /auth/signin
authRouter.post("/signin", createNewEmail, Users.createUser);

//! route for login
//* /auth/LOGIN
authRouter.post("/login", checkEmail, Users.userLogIn);


module.exports = authRouter;
