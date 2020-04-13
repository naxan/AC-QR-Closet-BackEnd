const db = require("../models");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err)
      return res.status(400).json({
        status: 400,
        message: "Something went wrong, please try again",
      });

    if (foundUser) {
      return res.status(400).json({
        status: 400,
        message:
          "Account already registered, please choose a different username or login",
      });
    }

    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res
          .status(400)
          .json({ status: 400, message: "Something went wrong" });

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err)
          return res
            .status(400)
            .json({ status: 400, message: "Something went wrong" });

        const userData = {
          username: req.body.username,
          password: hash,
        };

        db.User.create(userData, (err, newUser) => {
          if (err)
            return res
              .status(400)
              .json({ status: 400, message: "Something went wrong" });

          res.status(201).json({ status: 201, message: "Success" });
        });
      });
    });
  });
};

const login = (req, res) => {
  // Verify req.body Is Not Empty

  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err)
      return res
        .status(400)
        .json({ status: 400, error: "Something went wrong, please try again" });

    // If No User Found, Respond with 400
    if (!foundUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid credentials" });
    }

    // Compare Password Sent Password and foundUser Password
    // Hash the req.body.password (supplied password)
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err)
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again",
        });

      if (isMatch) {
        // create a session and respond
        const currentUser = {
          _id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        };

        // Create a new session
        req.session.currentUser = currentUser;

        // Respond
        res.status(200).json({ status: 200, user: currentUser });
      } else {
        // respond with error
        console.log(req.body.password, foundUser.password);
        res.status(401).json({
          status: 401,
          message: "Unauthorized, please login and try again.",
        });
      }
    });

    // If Passwords Match, Create Session and Respond with 200

    // If Passwords Do Not Match, Respond with 400
  });
};

const logout = (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({
      status: 401,
      error: "Unauthorized, please login and try again.",
    });
  }

  req.session.destroy((err) => {
    if (err)
      return res
        .status(400)
        .json({ status: 400, error: "Something went wrong, please try again" });

    res.status(200).json({ status: 200, message: "Success" });
  });
};

const verify = (req, res) => {
  if (req.session.currentUser) {
    return res.json({
      status: 200,
      message: "Authorized",
      currentUser: req.session.currentUser,
    });
  }

  res
    .status(401)
    .json({ status: 401, message: "Unauthorized, please login and try again" });
};

module.exports = {
  register,
  login,
  logout,
  verify,
};
