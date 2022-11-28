const Users = require("../models/users");

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

module.exports = {
  checkEmail,
};
