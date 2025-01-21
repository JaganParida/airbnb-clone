const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route and Create Route
router
  .route("/")
  //Index Route
  .get(wrapAsync(listingControllers.index))
  //Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

//Show Route and update Route and delete Route
router
  .route("/:id")
  //Show Route
  .get(wrapAsync(listingControllers.showListing))
  //Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControllers.updateListing)
  )
  //Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.renderEditForm)
);

module.exports = router;
