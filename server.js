const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");

require("dotenv").config();

// CORS
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

const PORT = process.env.PORT || 4000;
const db = require("./models");
const routes = require("./routes");

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(
  session({
    store: new MongoStore({
      url: process.env.MONGODO_URI || "mongodb://localhost:27017/ac-qr-closet",
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// API ROUTES
app.use("/api/v1", routes.api);

// AUTH ROUTES
app.use("/auth", routes.auth);

// START SERVER
app.listen(PORT, () => console.log(`Server is running at localhost:${PORT}`));
