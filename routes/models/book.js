const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  price: Number,
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

bookSchema.index({ title: "text" });

// delete all the reviews after deleting the book
bookSchema.post("findOneAndDelete", async function (book) {
  if (book) {
    await Review.deleteMany({
      _id: {
        $in: book.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Book", bookSchema);
