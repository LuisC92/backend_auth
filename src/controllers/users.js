const Users = require("../models/users");
const { hashPassword } = require("../helpers/auth");

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

module.exports = {
  createUser,
};
