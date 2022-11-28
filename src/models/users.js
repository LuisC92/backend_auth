const db = require("../../db-config");

const findOneEmail = (email) => {
  return db
    .query("SELECT email from users WHERE email=?", email)
    .then((res) => res[0]);
};

const create = (email, hashedPassword) => {
  return db
    .query("INSERT INTO users (email, hashedpassword) VALUES (?,?)", [
      email,
      hashedPassword,
    ])
    .then((res) => res);
};

module.exports = { findOneEmail, create };
