const model = require("../Models/auth.js");
const authControl = {
  register: (req, res) => {
    model
      .register(req.body)
      .then((newBody) => {
        res.status(201).send({
          success: true,
          message: "Register Success Bro!",
          data: newBody,
        });
      })
      .catch((err) => {
        res.status(500).send({
          succes: false,
          message: err.message,
        });
      });
  },

  login: (req, res) => {
    model.login(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Login Success Bro!",
          token: data,
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  },
};

module.exports = authControl;
