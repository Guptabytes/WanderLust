const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isloggedin, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");

const upload = multer({ storage })



router
    .route("/")
    .get(wrapAsync(listingController.index))  //Index Route
    .post(
        isloggedin,
        
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing))  //Create Route
    
    


//New Route 
router.get("/new",isloggedin,  listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListings)) //Show Route
    .put(isloggedin, 
        isOwner, 
        upload.single('listing[image]'),
        validateListing, 
        wrapAsync(listingController.updateListing)) //Update Route
    .delete(isloggedin, isOwner, wrapAsync(listingController.destroyListing)); //Delete Route


//Edit Route
router.get("/:id/edit", isloggedin, isOwner, wrapAsync(listingController.renderEditForm))


module.exports = router;
