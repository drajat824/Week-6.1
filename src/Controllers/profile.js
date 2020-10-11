const model = require("../Models/profile.js");

const profile_controller = {
  getProfile: (req, res) => {
    const auth = req.auth;

    if (auth === "admin" || auth === "user" || auth === undefined) {
      model
        .getProfile()
        .then((result) => {
          res.status(200).send({
            success: true,
            message: "Success",
            data: result,
          });
        })
        .catch(() => {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            data: [],
          });
        });
    } else {
      res.send({
        success: false,
        message: "Bukan Admin/ User",
      });
    }
  },

  postProfile: (req, res) => {
    const { name, password, phone, email, balance, pin } = req.body;
    const auth = req.auth;

    if (auth === "admin") {
      model
        .postProfile(name, password, phone, email, balance, pin)
        .then((result) => {
          if (name && password && phone && email && balance && pin) {
            res.status(201).send({
              success: true,
              message: "Success",
              data: result,
            });
          } else {
            res.status(400).send({
              success: false,
              message: "All fields must be filled",
              data: [],
            });
          }
        })
        .catch(() => {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            data: [],
          });
        });
    } else if (auth === "user"){
      res.status(401).send({
        success: false,
        message: "Anda Bukan Admin",
        data: [],
      });
    } else {
        res.status(401).send({
          success: false,
          message: "Anda Bukan Admin/User",
          data: [],
        });
      }
  },

  patchProfile: (req, res) => {
    const { id } = req.params;
    const { name, password, phone, email, balance, pin } = req.body;
    const auth = req.auth;

    if (auth === "admin") {
      const data = Object.entries(req.body).map((item) => {
        return parseInt(item[1]) > 0
          ? `${item[0]}=${item[1]}`
          : `${item[0]}='${item[1]}'`;
      });

      model.patchProfile(name, password, phone, email, balance, pin, id, data)

        .then((result) => {
          if (name || password || phone || email || balance || pin) {
            if (result.affectedRows) {
              res.status(200).send({
                success: true,
                message: "Success",
                data: result,
              });
            } else {
              res.status(400).send({
                success: false,
                message: "Id not found",
                data: [],
              });
            }
          } else {
            res.status(400).send({
              success: false,
              message: "Fields must be filled",
              data: [],
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: err.message,
            data: [],
          });
        });
    } else if (auth === "user"){
        res.status(401).send({
          success: false,
          message: "Anda Bukan Admin",
          data: [],
        });
      } else {
          res.status(401).send({
            success: false,
            message: "Anda Bukan Admin/User",
            data: [],
          });
        }
    },

  deleteProfile: (req, res) => {
    const { id } = req.params;
    const auth = req.auth;

    if (auth === "admin") {
      model
        .deleteProfile(id)
        .then((result) => {
          if (result.affectedRows) {
            res.status(200).send({
              success: true,
              message: "Success",
              data: result,
            });
          } else {
            res.status(400).send({
              success: false,
              message: "Id not found",
              data: [],
            });
          }
        })
        .catch(() => {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            data: [],
          });
        });
    } else if (auth === "user"){
        res.status(401).send({
          success: false,
          message: "Anda Bukan Admin",
          data: [],
        });
      } else {
          res.status(401).send({
            success: false,
            message: "Anda Bukan Admin/User",
            data: [],
          });
        }
    },
};

module.exports = profile_controller;
