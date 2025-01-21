const Listing = require("./models/listing");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");

//check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // store the url they are requesting
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to to use this function");
    return res.redirect("/login");
  }
  next();
};

//save the redirect url
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

//check if the user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//Handle error of listing
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Handle error of review
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//check if the user is the owner of the review
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
