if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const ExpressError = require("./routes/utils/ExpressError");

const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");

// process.env.DB_URL
const mongoUrl = process.env.DB_URL || "mongodb://localhost:27017/review-app";

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to Mongo!"))
  .catch((error) => console.log(error));

const sessionConfig = {
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: mongoUrl,
    touchAfter: 24 * 3600,
    crypto: {
      secret: process.env.SESSION_STORE_SECRET,
    },
  }),
  cookie: {
    httpOnly: true,
    // secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
};
app.use(session(sessionConfig));

app.use("/api", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/books/:id/reviews", reviewRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "I'm lost!";
  res.status(statusCode).send(err.message);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000!");
});
