const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewCreator } = require("./middleware");
const Book = require("./models/book");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const asyncWrapper = require("./utils/asyncWrapper");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncWrapper(async (req, res) => {
    const book = await Book.findById(req.params.id);
    const review = new Review(req.body.review);
    review.creator = req.session.user_id;
    book.reviews.push(review);
    await review.save();
    await book.save();
    res.send("Saved");
  })
);

router
  .route("/:reviewId")
  .put(
    isLoggedIn,
    isReviewCreator,
    validateReview,
    asyncWrapper(async (req, res) => {
      const { reviewId } = req.params;
      const review = await Review.findByIdAndUpdate(reviewId, {
        ...req.body.review,
      });
      res.send("Modified");
    })
  )
  .delete(
    isLoggedIn,
    isReviewCreator,
    asyncWrapper(async (req, res) => {
      const { id, reviewId } = req.params;
      await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      res.send("Deleted");
    })
  );

module.exports = router;
