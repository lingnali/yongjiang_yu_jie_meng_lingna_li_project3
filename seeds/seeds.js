if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Book = require("../routes/models/book");
const User = require("../routes/models/user");
const books = require("./books.json");
// process.env.DB_URL
const mongoUrl = process.env.DB_URL;
// "mongodb://localhost:27017/review-app";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to Mongo!"))
  .catch((error) => console.log(error));

const seedDB = async () => {
  await Book.deleteMany({});
  await User.deleteMany({});
  const user = new User({
    username: process.env.DEMO_USERNAME,
    password: process.env.DEMO_PASSWORD,
  });
  await user.save();
  for (let b of books.list) {
    const book = new Book({ ...b, creator: user._id });
    await book.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
