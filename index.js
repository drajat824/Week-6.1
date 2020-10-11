const express = require ('express');
const app = express();
const bodyParser = require ("body-parser");
require('dotenv').config()

const profileRoute = require("./src/Routes/profile")
const authRoute = require("./src/Routes/auth")


//running
app.listen(process.env.PORT, () => {
	console.log(`server running on port ${process.env.PORT}`);
});

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (request, response) => {
    response.send("Hello world");
});

app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/auth", authRoute);