const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");

const db = require("./models");
const routes = require("./routes");

// MIDDLEWARE
app.use(bodyParser.json());

// API ROUTES
app.use("/api/v1", routes.api);

// START SERVER
app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`));
