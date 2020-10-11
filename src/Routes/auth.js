const authRoute = require('express').Router();

const controller = require("../Controllers/auth.js");

authRoute.post("/register", controller.register);
authRoute.get("/login", controller.login);

module.exports = authRoute
