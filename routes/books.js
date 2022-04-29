const express = require("express");
const router = express.Router();
const asyncWrapper = require("./utils/asyncWrapper");
const { isLoggedIn, isBookCreator, validateBook } = require("./middleware");

const Book = require("./models/book");

router
  .route("/")
  .get(
    asyncWrapper(async (req, res) => {
      const search = req.query.q;
      if (search) {
        const results = await Book.find({ $text: { $search: search } }).sort(
          "createDate"
        );
        return res.send(results);
      }
      const books = await Book.find({}).sort("-createDate");
      res.send(books);
    })
  )
  .post(
    isLoggedIn,
    validateBook,
    asyncWrapper(async (req, res, next) => {
      const book = new Book(req.body.book);
      book.creator = req.session.user_id;
      await book.save();
      res.send("Saved!");
    })
  );

router
  .route("/:id")
  .get(
    asyncWrapper(async (req, res) => {
      const book = await Book.findById(req.params.id)
        .populate({
          path: "reviews",
          options: { sort: { creatDate: 1 } },
          populate: {
            path: "creator",
            select: "username",
          },
        })
        .populate("creator", "username");
      if (!book) {
        return res.status(404).send("Not found!");
      }
      res.send(book);
    })
  )
  .put(
    isLoggedIn,
    isBookCreator,
    validateBook,
    asyncWrapper(async (req, res) => {
      const { id } = req.params;
      const book = await Book.findByIdAndUpdate(id, {
        ...req.body.book,
      });
      res.send("Modified");
    })
  )
  .delete(
    isLoggedIn,
    isBookCreator,
    asyncWrapper(async (req, res) => {
      const { id } = req.params;
      await Book.findByIdAndDelete(id);
      res.send("Deleted");
    })
  );

module.exports = router;
