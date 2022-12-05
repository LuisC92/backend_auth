const db = require("../../db-config");

const findOneEmail = (email) => {
  return db
    .query("SELECT email from users WHERE email=?", email)
    .then((res) => res[0]);
};

const getHash = (email) => {
  return db
    .query("SELECT hashedpassword from users WHERE email=?", email)
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

const getAll = ()=>{
  return db
  .query("SELECT email from users")
  .then((res) => res);
};

module.exports = { findOneEmail, create, getAll, getHash };
