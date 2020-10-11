const profileRoute = require('express').Router();

const controller = require("../Controllers/profile.js");

const middleware = require("../middleware/middleware")

profileRoute.get("/", middleware, controller.getProfile);
profileRoute.post("/", middleware, controller.postProfile);
profileRoute.patch("/:id", middleware, controller.patchProfile);
profileRoute.delete("/:id", middleware, controller.deleteProfile);

module.exports = profileRoute