const Users = require("../models/users");
const { hashPassword, verifyPassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken")
//! create user
const createUser = (req, res) => {
  //* hash password
  const { email, password } = req.body;
  hashPassword(password).then((hashedPassword) => {
    Users.create(email, hashedPassword)
      .then((result) => {
        res.status(201).json({
          user: req.body.user,
          message: "User created successfully",
        });
      })
      .catch((error) => res.status(403).json({ message: error.message }));
  });
};
//! check all user
const getAll = (req, res) => {
  Users.getAll().then((result) => {
    console.log(result);
    res.status(200).send(result);
  });
};

//! log in as user
const userLogIn = (req, res) => {
  //* verify password
  const { email, password } = req.body;
  Users.getHash(email).then((result) => {
    const {hashedpassword} = result[0];
    console.log("results",hashedpassword);
    verifyPassword(password, hashedpassword).then((result) => {
      //* create jwt token
      const token = jwt.sign({email:email},process.env.PRIVATE_KEY)
      res.status(200).cookie('user_token', token, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24*90))}).json({email:email, token: token})
    }).catch((err) => {
      console.error(err);
      res.send(err.message);
    })
  });
};

module.exports = {
  createUser,
  getAll,
  userLogIn,
};
