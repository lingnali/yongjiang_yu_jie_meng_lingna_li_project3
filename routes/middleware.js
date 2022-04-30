const Joi = require("joi");
const ExpressError = require("./utils/ExpressError");
const Book = require("./models/book");
const Review = require("./models/review");

bookSchema = Joi.object({
  book: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
  }).required(),
});

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

module.exports.validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

module.exports.isBookCreator = async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book.creator.equals(req.session.user_id)) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

module.exports.isReviewCreator = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.creator.equals(req.session.user_id)) {
    return res.status(401).send("Unauthorized");
  }
  next();
};
