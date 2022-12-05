const Users = require("../models/users");
const jwt = require("jsonwebtoken")

//* check if email already exists
const checkEmail = (req, res, next) => {
  const { email } = req.body;
  //* get the email address from DB using model
  Users.findOneEmail(email)
    .then((result) => {
      if (result[0]) {
        req.user = result[0];
        next();
      } else {
        res.status(401).send("wrong email address");
      }
    })
    .catch((error) => console.error(error));
};

//* just used to create a new account
const createNewEmail = (req, res, next) => {
  const { email } = req.body;
  //* get the email address from DB using model
  Users.findOneEmail(email)
    .then((result) => {
      if (!result[0]) {
        next();
      } else {
        res.status(409).send("This email address already exists");
      }
    })
    .catch((error) => console.error(error));
};

const checkAuth = (req, res, next) => {
  if(req.cookies){
    jwt.verify(req.cookies.user_token, process.env.PRIVATE_KEY, (err, decode) => {
      if(err){
        console.error(err)
        res.status(401).send("Your login it's not valid")
      } else {
        next()
      }
    })
  } else {
    res.status(401).send("You don't have permission to access. Try again.")
  }
}

module.exports = {
  checkEmail,
  createNewEmail,
  checkAuth
};
